// components/HomeContent.tsx
import { Student } from '@/types/student';
import { Teacher } from '@/types/teacher';
import { School as SchoolType } from '@/types/school';
import SchoolHeader from './SchoolHeader';
import SchoolInfo from './SchoolInfo';
import StatsOverview from './StatsOverview';

interface HomeContentProps {
  school: SchoolType;
  students: Student[];
  teachers: Teacher[];
}

export default function HomeContent({
  school,
  students,
  teachers,
}: //   teachers,
HomeContentProps) {
  return (
    <div className="space-y-8">
      <SchoolHeader school={school} />
      <StatsOverview students={students} teachers={teachers} />
      <SchoolInfo school={school} />
    </div>
  );
}
