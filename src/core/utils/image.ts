export function getImageUrl(url: string): string | null {
  const BASE_URL = 'http://localhost:3000';
  if (!url) return null;
  return url.startsWith('http') ? url : `${BASE_URL}${url}`;
}

export function getCursoImageUrl(url: string): string {
  const imageUrl = getImageUrl(url);
  if (imageUrl) return imageUrl;
  
  // Imagen por defecto para cursos sin imagen
  return 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Sin+Imagen';
} 