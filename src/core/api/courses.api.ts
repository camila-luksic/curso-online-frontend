import type {
    Course,
    CourseEnrollment,
    CreateCourseInput,
    UpdateCourseInput,
} from '../types/course.types';
import { apiInstance } from './instance.api';

export const getCourses = async (): Promise<Course[]> =>
  (await apiInstance.get<Course[]>('/cursos')).data;

export const getCoursesByTeacher = async (profesorId: number): Promise<Course[]> =>
  (await apiInstance.get<Course[]>(`/cursos?profesorId=${profesorId}`)).data;

export const getCourse = async (id: number): Promise<Course> =>
  (await apiInstance.get<Course>(`/cursos/${id}`)).data;

export const getCourseEnrollments = async (cursoId: number): Promise<CourseEnrollment[]> =>
  (await apiInstance.get<CourseEnrollment[]>(`/cursos/${cursoId}/inscripciones`)).data;

export const createCourse = async (payload: CreateCourseInput): Promise<Course> =>
  (await apiInstance.post<Course>('/cursos', payload)).data;

export const updateCourse = async (
  id: number,
  payload: UpdateCourseInput,
): Promise<Course> =>
  (await apiInstance.patch<Course>(`/cursos/${id}`, payload)).data;

export const deleteCourse = async (id: number): Promise<void> => {
  await apiInstance.delete(`/cursos/${id}`);
}; 