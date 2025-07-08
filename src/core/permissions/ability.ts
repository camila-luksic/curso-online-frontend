import type { Usuario } from '@/features/auth/types/usuario.types';
import { Ability, AbilityBuilder, subject } from '@casl/ability';

// Acciones custom: upload (subir imagen), reorder (reordenar videos), enroll (inscribirse en curso)
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | 'upload' | 'reorder' | 'enroll';
export type Subjects = 'Curso' | 'Video' | 'Category' | 'User' | 'Role' | 'Nota' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

export function defineAbilityFor(user: Usuario | null) {
  const { can,cannot, build } = new AbilityBuilder<Ability<[Actions, Subjects]>>(Ability as any);

  if (!user) return build();

  const { codigo } = user.rol;

  if (codigo === 'ADMIN') {
    can('manage', 'all');
    cannot('enroll', 'Curso'); 
    // O explícito para categorías:
    // can('manage', 'Category');
  }

  if (codigo === 'PROF') {
    can(['read', 'create', 'update', 'delete', 'upload'], 'Curso', { profesorId: user.id } as any); // sólo sus cursos

    // Videos: sólo los propios (ownerId) y puede reordenar los de sus cursos
    can(['read', 'create'], 'Video'); // puede ver y crear todos
    can(['update', 'delete'], 'Video', { ownerId: user.id } as any); // sólo sus videos
    can('reorder', 'Video', { 'curso.profesorId': user.id } as any); // puede reordenar videos de sus cursos

    can('read', 'Category');

    // Permiso para gestionar notas de sus cursos
    can('manage', 'Nota', { 'curso.profesorId': user.id } as any);
  }

  if (codigo === 'EST') {
    can('read', ['Curso', 'Video', 'Category']);
    can('enroll', 'Curso'); // Permiso para inscribirse en cursos
  }

  return build();
}

export { subject };

