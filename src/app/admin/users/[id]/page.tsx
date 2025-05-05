import UserDetail from '../../../../components/features/admin/users/UserDetail';

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  return <UserDetail userId={params.id} />;
}
