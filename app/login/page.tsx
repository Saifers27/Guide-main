"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import {
  ArrowRight,
  Chrome,
  Eye,
  EyeOff,
  Github,
  Linkedin,
  Loader2,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../components/lib/firebase";

type ProviderKey = "google" | "github" | "linkedin";

const socialProviders: Array<{
  label: string;
  key: ProviderKey;
  Icon: LucideIcon;
}> = [
  { label: "Google", key: "google", Icon: Chrome },
  { label: "GitHub", key: "github", Icon: Github },
  { label: "LinkedIn", key: "linkedin", Icon: Linkedin },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    tone: "success" | "error";
  } | null>(null);

  const updateField =
    (field: "email" | "password") => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const getErrorMessage = (error: unknown) => {
    if (error && typeof error === "object" && "code" in error) {
      const code = String((error as { code?: string }).code);
      if (code.includes("invalid-credential")) {
        return "Invalid email or password. Check your details and try again.";
      }
      if (code.includes("too-many-requests")) {
        return "Too many attempts. Please wait a moment before trying again.";
      }
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "Unexpected error. Please try again.";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password.trim()
      );
      const signedInEmail = auth.currentUser?.email ?? form.email;
      setFeedback({
        tone: "success",
        message: `Signed in as ${signedInEmail}. Redirecting you now...`,
      });
    } catch (error) {
      setFeedback({ tone: "error", message: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (providerKey: ProviderKey) => {
    setFeedback(null);
    setLoading(true);
    try {
      const provider =
        providerKey === "google"
          ? new GoogleAuthProvider()
          : providerKey === "github"
          ? new GithubAuthProvider()
          : new OAuthProvider("linkedin.com");
      await signInWithPopup(auth, provider);
      const identity =
        auth.currentUser?.displayName ||
        auth.currentUser?.email ||
        "your account";
      setFeedback({
        tone: "success",
        message: `Signed in with ${providerKey} as ${identity}.`,
      });
    } catch (error) {
      setFeedback({ tone: "error", message: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.shell}>
        <article className={styles.card}>
          <div className={styles.formPanel}>
            <div className={styles.formHeader}>
              <span>
                <Sparkles size={16} style={{ marginRight: 4 }} /> Secure
                workspace
              </span>
              <h2>Welcome back</h2>
              <p>
                Access your saved lessons, personalized tools, and curated Japan
                updates from any device.
              </p>
            </div>

            {feedback && (
              <div
                className={
                  feedback.tone === "success"
                    ? `${styles.feedback} ${styles.feedbackSuccess}`
                    : `${styles.feedback} ${styles.feedbackError}`
                }
                role="status"
                aria-live="polite"
              >
                {feedback.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.inputStack}>
              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <strong>Email</strong>
                  <span>Use your school or personal account</span>
                </div>
                <label className={styles.field}>
                  <span className={styles.inputIcon}>
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={updateField("email")}
                    disabled={loading}
                  />
                </label>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <strong>Password</strong>
                  <span>Minimum 8 characters</span>
                </div>
                <label className={styles.field}>
                  <span className={styles.inputIcon}>
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    minLength={8}
                    value={form.password}
                    onChange={updateField("password")}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </label>
              </div>

              <div className={styles.formExtras}>
                <label className={styles.checkbox}>
                  <input type="checkbox" name="remember" defaultChecked />
                  Keep me signed in
                </label>
                <Link className={styles.link} href="/survival">
                  Need help?
                </Link>
              </div>

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className={styles.spinner} size={18} />
                    Signing you in
                  </>
                ) : (
                  <>
                    Continue to dashboard <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className={styles.divider}>or continue with</div>

            <div className={styles.socialButtons}>
              {socialProviders.map((provider) => (
                <button
                  type="button"
                  className={styles.socialButton}
                  key={provider.label}
                  onClick={() => handleProviderSignIn(provider.key)}
                  disabled={loading}
                >
                  <provider.Icon size={18} />
                  {provider.label}
                </button>
              ))}
            </div>

            <p className={styles.caption}>
              First time here? <Link href="/">Create a free account</Link>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
