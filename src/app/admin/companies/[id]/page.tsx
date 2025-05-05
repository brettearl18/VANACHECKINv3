import CompanyDetail from '../../../../components/features/admin/companies/CompanyDetail';

export default function AdminCompanyDetailPage({ params }: { params: { id: string } }) {
  return <CompanyDetail companyId={params.id} />;
}
