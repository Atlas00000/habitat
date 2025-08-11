# 🦁 Habitat Explorer - Interactive Wildlife Experience

[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://hub.docker.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.31-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-3D%20Graphics-green)](https://docs.pmnd.rs/react-three-fiber/)
[![Mobile First](https://img.shields.io/badge/Mobile%20First-Responsive-orange)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

> **Explore the world's most fascinating wildlife in immersive 3D environments with interactive educational content.**

## 🌟 **Project Overview**

Habitat Explorer is an interactive web application that brings wildlife education to life through stunning 3D environments, comprehensive animal fact sheets, and engaging mobile-first experiences. Explore diverse ecosystems from the Arctic tundra to African savannas, each featuring realistic 3D models and detailed educational content.

### **🎯 Key Features**

- **🦌 Interactive 3D Environments** - Realistic wildlife habitats with detailed 3D models
- **📱 Mobile-First Design** - Optimized fact sheets and responsive layouts
- **🎨 Region-Specific Theming** - Unique visual themes for each ecosystem
- **🔄 Auto-Rotating Content** - Dynamic fact presentation with manual controls
- **📊 Comprehensive Data** - Detailed animal statistics, diets, and fun facts
- **⚡ Performance Optimized** - Fast loading with model caching and lazy loading
- **🐳 Docker Ready** - Containerized deployment for easy scaling

---

## 🗺️ **Explore Our Regions**

### **🏔️ Mountain Region**
- **Mountain Goat** - Alpine climber with specialized adaptations
- Rugged terrain with rocky cliffs and steep slopes
- Gray mountain theme with elevation-based content

### **🌲 Forest Region**
- **White-tailed Deer** - Graceful forest dweller
- **Black Bear** - Powerful omnivore with enhanced features
- **Red Fox** - Cunning nocturnal hunter
- **Raccoon** - Clever problem-solver
- **Jaguar** - Apex rainforest predator
- Green forest theme with night atmosphere

### **❄️ Arctic Region**
- **Polar Bear** - Arctic apex predator
- Snow and ice environments with extreme conditions
- Blue arctic theme with polar lighting

### **🌍 Safari Region**
- **Lion** - Majestic pride leader
- African savanna with grassland landscapes
- Yellow/orange safari theme with warm lighting

---

## 📱 **Mobile Experience**

### **🎯 Mobile Fact Sheets**
Every animal page features a compact, interactive fact sheet that:
- **Auto-rotates** through comprehensive content every 5 seconds
- **Manual Navigation** with intuitive controls and progress indicators
- **Region Theming** with ecosystem-specific colors and styling
- **Touch-Optimized** with proper button sizes and spacing

### **📊 Content Categories**
- **Fun Facts** - Engaging educational tidbits
- **Statistics** - Weight, height, lifespan, and speed
- **Diet Information** - Detailed food sources and preferences
- **Habitat Details** - Comprehensive environment descriptions

### **🎨 Visual Design**
- **Glass-morphism** effects with backdrop blur
- **Smooth Animations** using Framer Motion
- **Responsive Layout** that adapts to all screen sizes
- **Accessibility** features for inclusive experience

---

## 🛠️ **Technical Architecture**

### **Frontend Stack**
```
Next.js 14.2.31
├── React 18
├── TypeScript 5.0
├── Tailwind CSS
├── Framer Motion
└── React Three Fiber
```

### **3D Graphics**
- **Three.js** - 3D rendering engine
- **React Three Fiber** - React integration
- **GLB/GLTF Models** - Optimized 3D assets
- **Environment Maps** - HDR lighting and reflections

### **Performance Features**
- **Model Caching** - Preloaded 3D assets for faster loading
- **Lazy Loading** - Components load on demand
- **Image Optimization** - Next.js automatic optimization
- **Bundle Splitting** - Efficient code distribution

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- pnpm (recommended) or npm
- Docker (optional)

### **Local Development**

```bash
# Clone the repository
git clone <repository-url>
cd habitat

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### **Docker Deployment**

```bash
# Build the image
docker build -t habitat-explorer .

# Run with Docker Compose
docker-compose up -d

# Access at http://localhost:3000
```

### **Environment Variables**

```env
# .env.local
NEXT_PUBLIC_CLOUDFLARE_URL=your-cloudflare-url
NEXT_PUBLIC_ASSET_BASE_URL=your-asset-base-url
```

---

## 📁 **Project Structure**

```
habitat/
├── app/                          # Next.js App Router
│   ├── forest/                   # Forest region pages
│   │   ├── deer/page.tsx        # Deer animal page
│   │   ├── black-bear/page.tsx  # Black bear page
│   │   └── ...                  # Other forest animals
│   ├── arctic/                  # Arctic region pages
│   ├── safari/                  # Safari region pages
│   └── mountain/                # Mountain region pages
├── src/
│   ├── components/              # React components
│   │   ├── AnimalPage.tsx       # Main animal page component
│   │   ├── MobileFactSheet.tsx  # Mobile fact sheet component
│   │   ├── BearAnimalPage.tsx   # Enhanced bear page
│   │   └── 3D/                  # 3D components
│   ├── data/                    # Animal data files
│   │   ├── deer-data.ts         # Deer information
│   │   ├── lion-data.ts         # Lion information
│   │   └── ...                  # Other animal data
│   └── config/                  # Configuration files
├── public/                      # Static assets
└── docker-compose.yml           # Docker configuration
```

---

## 🎨 **Design System**

### **Color Themes by Region**

| Region | Primary | Secondary | Background | Accent |
|--------|---------|-----------|------------|---------|
| **Forest** | Green | Emerald | Green-50 | Green-200 |
| **Arctic** | Blue | Cyan | Blue-50 | Blue-200 |
| **Safari** | Yellow | Orange | Yellow-50 | Yellow-200 |
| **Mountain** | Gray | Slate | Gray-50 | Gray-200 |

### **Component Library**
- **Glass Components** - Translucent UI elements
- **Mobile Layout** - Responsive design system
- **Animal Cards** - Interactive wildlife cards
- **Fact Carousels** - Dynamic content presentation

---

## 📊 **Performance Metrics**

### **Loading Performance**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### **3D Performance**
- **Frame Rate**: 60 FPS target
- **Model Loading**: < 3s for complex models
- **Memory Usage**: Optimized for mobile devices
- **Battery Efficiency**: Reduced GPU usage

---

## 🔧 **Development Guide**

### **Adding New Animals**

1. **Create Data File**
```typescript
// src/data/new-animal-data.ts
import { Animal } from './deer-data'

export const newAnimalData: Animal = {
  name: "Animal Name",
  scientificName: "Scientific name",
  habitat: "Detailed habitat description",
  diet: ["Food item 1", "Food item 2"],
  conservationStatus: "Least Concern",
  funFacts: ["Fact 1", "Fact 2"],
  stats: {
    weight: "Weight range",
    height: "Height range",
    lifespan: "Lifespan range",
    speed: "Speed range"
  }
}
```

2. **Create Page Component**
```typescript
// app/region/animal/page.tsx
import { AnimalPage } from '../../../src/components/AnimalPage'
import { newAnimalData } from '../../../src/data/new-animal-data'

export default function NewAnimalPage() {
  return (
    <AnimalPage
      animal={newAnimalData}
      category="region"
      environmentDescription="Description"
      features={["Feature 1", "Feature 2"]}
      backUrl="/region"
      backLabel="Back to Region"
    />
  )
}
```

### **Customizing Themes**

```typescript
// In AnimalPage.tsx
const regionThemes = {
  newRegion: {
    primary: 'bg-custom-600',
    secondary: 'bg-custom-100/50',
    accent: 'bg-custom-200/50',
    background: 'from-custom-50/95 to-custom-50/95',
    border: 'border-custom-200/30',
    text: 'text-custom-900',
    textSecondary: 'text-custom-700'
  }
}
```

---

## 🐳 **Docker Configuration**

### **Multi-Stage Build**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### **Docker Compose**
```yaml
services:
  habitat:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

---

## 📈 **Analytics & Monitoring**

### **Performance Monitoring**
- **Core Web Vitals** tracking
- **3D rendering performance** metrics
- **Mobile user experience** analytics
- **Asset loading times** monitoring

### **User Engagement**
- **Fact sheet interaction** tracking
- **Animal page visit** analytics
- **Mobile vs desktop** usage patterns
- **Region popularity** metrics

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **Code Standards**
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Conventional Commits** for commit messages

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **3D Models**: Sourced from various wildlife model libraries
- **Educational Content**: Based on scientific wildlife research
- **Design Inspiration**: Modern wildlife conservation websites
- **Technology Stack**: Built with cutting-edge web technologies

---

## 📞 **Support**

- **Email**: emilicelestine@gmail.com
- Github: https://github.com/Atlas00000

---

**Made with ❤️ for wildlife education and conservation**

*Explore. Learn. Conserve.* 