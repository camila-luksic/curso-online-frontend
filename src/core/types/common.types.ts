export type UserRole = 'ADMIN' | 'PROF' | 'EST';

export interface RouteConfig {
    path: string;
    element: React.ComponentType;
    roles?: UserRole[];
    children?: RouteConfig[];
    isPublic?: boolean;
}

export interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
    redirectTo?: string;
}
