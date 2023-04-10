import { AuthGuard } from '@/components/AuthGaurd';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['user']}>
      <>{children}</>
    </AuthGuard>
  );
}
