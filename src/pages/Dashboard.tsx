import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import HomeContent from '@/components/HomeContent';
import { School } from '@/types/school';
import { Student } from '@/types/student';
import { Teacher } from '@/types/teacher';
import { schoolAPI, studentAPI, teacherAPI } from '@/lib/api';
import Students from '@/components/student/Students';

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const [school, setSchool] = useState<School | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStudentPage, setCurrentStudentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const schoolResponse = await schoolAPI.getSchoolById(id!);
        setSchool(schoolResponse.data.data);
        setError(null);
      } catch (err: any) {
        if (err.response.status === 404) {
          setError(null);
        } else {
          setError(err.message || 'Failed to load data');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch students and reacher when school data is available
  useEffect(() => {
    if (school) {
      const fetchStudent = async () => {
        try {
          console.log(`/student/${school._id}?page=${currentStudentPage}`);
          const studentsResponse = await studentAPI.getStudent(
            school._id,
            currentStudentPage
          );
          console.log('Fetched students:', studentsResponse);
          setStudents(studentsResponse.data.data);
        } catch (err) {
          if (err.response && err.response.status === 404) {
            setStudents([]);
          } else {
            console.log('Failed to load students', err);
            setError(err?.message || 'Failed to load students');
          }
        }
      };
      const fetchTeacher = async () => {
        try {
          const teachersResponse = await teacherAPI.getTeacherBySchoolId(
            school._id
          );
          setTeachers(teachersResponse.data.data);
        } catch (err) {
          if (err.response && err.response.status === 404) {
            setTeachers([]);
          } else {
            console.log('Failed to load teachers', err);
            setError(err?.message || 'Failed to load teachers');
          }
        }
      };
      fetchStudent();
      fetchTeacher();
    }
  }, [school]);

  // Fetch students and teachers
  const refreshData = useCallback(async () => {
    if (!school) return;
    try {
      setLoading(true);
      const studentsResponse = await studentAPI.getStudent(
        school._id,
        currentStudentPage
      );
      const teachersResponse = await teacherAPI.getTeacherBySchoolId(
        school._id
      );
      setStudents(studentsResponse.data.data);
      // setTeachers(teachersResponse.data.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setStudents([]);
      } else {
        console.log('Failed to refresh data', err);
        setError(err?.message || 'Failed to refresh data');
      }
    } finally {
      setLoading(false);
    }
  }, [school, currentStudentPage]);

  // Automatically refresh data when currentStudentPage changes
  useEffect(() => {
    if (school) {
      refreshData();
    }
  }, [currentStudentPage, refreshData, school]);

  // Handle pagination change for students
  const handleStudentPageChange = useCallback((page: number) => {
    setCurrentStudentPage(page);
    console.log('Students page changed to:', page);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={logout}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">
            Welcome, {user?.name || 'Admin'}
          </h1>
        </header>

        {/* Page content */}
        <main className="p-6 flex-1">
          {activeTab === 'home' && (
            <>
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-lg">Loading school data...</div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  <p className="font-medium">Error loading data:</p>
                  <p>{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              ) : school ? (
                <HomeContent
                  school={school}
                  students={students}
                  teachers={teachers}
                />
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
                  <p>No school found in database.</p>
                  <p className="text-sm mt-1">
                    Please contact your administrator to add school data.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === 'students' && (
            <Students
              schoolId={id!}
              students={students}
              loading={loading}
              error={error}
              onRefresh={refreshData}
              onPageChange={handleStudentPageChange}
            />
          )}
          {activeTab === 'teachers' && <div>👩‍🏫 Teachers content</div>}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
