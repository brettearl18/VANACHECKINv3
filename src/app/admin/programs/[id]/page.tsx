import ProgramDetail from '../../../../components/features/admin/programs/ProgramDetail';

export default function AdminProgramDetailPage({ params }: { params: { id: string } }) {
  return <ProgramDetail programId={params.id} />;
}
