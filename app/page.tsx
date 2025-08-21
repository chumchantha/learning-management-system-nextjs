import LoginModal from "@/components/auth/LoginModal";
import { ThemeToggle } from "@/components/ui/themeToggle";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ThemeToggle />
      <LoginModal />
    </div>
  );
}
