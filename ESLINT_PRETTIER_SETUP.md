# Configuración ESLint + Prettier

## 📦 Instalación de Dependencias

Debido a restricciones de PowerShell, necesitas instalar las dependencias manualmente:

```bash
# Usando yarn (recomendado para este proyecto)
yarn add -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-prettier eslint-plugin-prettier

# O usando npm
npm install --save-dev eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-prettier eslint-plugin-prettier
```

## 🚀 Scripts Disponibles

Una vez instaladas las dependencias, puedes usar estos scripts:

```bash
# Linting
yarn lint          # Verificar errores de ESLint
yarn lint:fix      # Corregir errores automáticamente

# Formateo
yarn format        # Formatear código con Prettier
yarn format:check  # Verificar formato sin cambiar archivos

# TypeScript
yarn type-check    # Verificar tipos de TypeScript
```

## 🔧 Configuración de VS Code

### Extensiones Recomendadas

Instala estas extensiones en VS Code:

1. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
2. **ESLint** (`dbaeumer.vscode-eslint`)
3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)

### Configuración Automática

El archivo `.vscode/settings.json` ya está configurado para:

- ✅ Formateo automático al guardar
- ✅ Corrección automática de ESLint
- ✅ Organización automática de imports
- ✅ Soporte para Tailwind CSS

## 📋 Reglas de ESLint Configuradas

### TypeScript
- ✅ Detección de variables no utilizadas
- ✅ Prevención de `any` explícito
- ✅ Preferencia por `const` sobre `let`
- ✅ Validación de tipos

### React
- ✅ Reglas de hooks (useEffect, useState, etc.)
- ✅ Validación de props
- ✅ Prevención de keys duplicadas
- ✅ Componentes auto-cerrados

### Accessibility (jsx-a11y)
- ✅ Texto alternativo en imágenes
- ✅ Validación de enlaces
- ✅ Roles ARIA correctos
- ✅ Navegación por teclado

### Código Limpio
- ✅ Preferencia por comillas simples
- ✅ Punto y coma obligatorio
- ✅ Comas finales en objetos/arrays
- ✅ Sin espacios en blanco al final

## 🎨 Configuración de Prettier

### Reglas de Formateo
- **Indentación**: 2 espacios
- **Ancho máximo**: 80 caracteres
- **Comillas**: Simples
- **Punto y coma**: Siempre
- **Comas finales**: ES5

### Archivos Ignorados
- `node_modules/`
- `dist/`, `build/`
- Archivos de configuración
- Archivos de lock

## 🔍 Uso en el Desarrollo

### Flujo de Trabajo Recomendado

1. **Al escribir código**: VS Code formatea automáticamente
2. **Antes de commit**: Ejecutar `yarn lint:fix && yarn format`
3. **En CI/CD**: Ejecutar `yarn lint && yarn format:check`

### Comandos Útiles

```bash
# Verificar todo el proyecto
yarn lint && yarn format:check && yarn type-check

# Corregir todo automáticamente
yarn lint:fix && yarn format
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules yarn.lock
yarn install
```

### Conflictos entre ESLint y Prettier
- ✅ Ya configurado con `eslint-config-prettier`
- ✅ `eslint-plugin-prettier` integrado

### VS Code no formatea automáticamente
1. Verificar que Prettier esté instalado
2. Reiniciar VS Code
3. Verificar configuración en `.vscode/settings.json`

## 📈 Beneficios

### Calidad de Código
- ✅ Consistencia en todo el proyecto
- ✅ Detección temprana de errores
- ✅ Mejores prácticas automáticas

### Productividad
- ✅ Formateo automático
- ✅ Corrección automática
- ✅ Menos tiempo en revisión de código

### Mantenibilidad
- ✅ Código legible y consistente
- ✅ Fácil onboarding de nuevos desarrolladores
- ✅ Menos conflictos en merge

## 🎯 Próximos Pasos

1. **Instalar dependencias** (ver arriba)
2. **Probar configuración**: `yarn lint`
3. **Formatear código existente**: `yarn format`
4. **Configurar pre-commit hooks** (opcional)
5. **Integrar con CI/CD** (opcional) 