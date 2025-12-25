This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and 
contributions are welcome!

# 🍽️ Foodio Frontend - Restaurant Management Web Application

A modern, responsive frontend application for restaurant management system built with Next.js, TypeScript, and Tailwind CSS.

## 📦 Technology Stack

- **Next.js** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Zod** - TypeScript-first schema validation
- **React Hook Form** - Performant forms with validation
- **JWT Decode** - JWT token decoding

## 🔹 Features

### Public Pages (Unauthenticated Users)
- **Homepage**: Browse menu categories and menu items
- **Menu Page**: View all available menu items with filters
- **Menu Item Details**: View name, image, description, price
- **Category Filter**: Filter items by category
- **Login/Register**: User authentication pages

### Customer Pages (Authenticated)
- **Dashboard**: Overview of orders and account
- **Food Menu**: Browse and order items
- **Order Details**: View detailed order information
- **Order Tracking**: Real-time order status tracking
  - Pending → Preparing → Ready → Completed
- **Profile Management**: Update user information

### Admin Dashboard (Admin Role Required)
- **Menu Items Management**: 
  - Create, edit, and delete menu items
  - Toggle item availability
  - Upload item images
- **Order Management**: 
  - View all orders
  - Update order status
  - Filter and search orders
- **Analytics Dashboard**: View statistics and insights

## 🎨 UI Components

- Responsive design with mobile-first approach
- Toast notifications for user feedback
- Loading states and skeleton screens
- Modal dialogs for forms (AddCategoryModal, AddNewItemModal)
- Image optimization with Next.js Image
- Form validation with real-time feedback

## ⚙️ Installation & Setup

### 1. Navigate to frontend folder
```bash
cd foodio_frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Required Packages

#### Install Axios (HTTP Client)
```bash
npm install axios
```

#### Install Zod (Schema Validation)
```bash
npm install zod
```

#### Install React Hook Form with Zod Resolver
```bash
npm install react-hook-form @hookform/resolvers
```

#### Install JWT Decode
```bash
npm install jwt-decode
```

#### Install All at Once
```bash
npm install axios zod react-hook-form @hookform/resolvers jwt-decode
```

### 4. Setup environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:4001
```

### 5. Run the development server
```bash
npm run dev
```

Application runs on **http://localhost:3001** (or default port 3000)

## 🚀 Running the Application

### Development mode
```bash
npm run dev
```

### Production build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## 📦 Package Versions

```json
{
  "name": "foodio_frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 4000",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "axios": "^1.13.2",
    "lucide-react": "^0.562.0",
    "next": "16.1.1",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

## 📁 Project Structure

```
FOODIO_FRONTEND/
├── .next/                        # Next.js build output
├── app/                          # Next.js app directory (App Router)
│   ├── (admin)/                 # Admin routes group
│   │   └── admin/               
│   │       ├── MenuItems/       # Menu items management
│   │       │   └── page.tsx
│   │       ├── Order/           # Order management
│   │       │   └── layout.tsx
│   │       └── layout.tsx
│   ├── (auth)/                  # Authentication routes group
│   │   └── auth/
│   │       └── page.tsx         # Login/Register page
│   ├── (customer)/              # Customer routes group
│   │   └── customer/
│   │       ├── Dashboard/       # Customer dashboard
│   │       │   └── page.tsx
│   │       ├── FoodMenu/        # Browse menu
│   │       │   └── page.tsx
│   │       ├── OrderDetails/    # Order details page
│   │       │   └── page.tsx
│   │       └── layout.tsx
│   ├── dev/                     # Development/Testing
│   │   └── component_test/
│   │       └── page.tsx
│   ├── utils/                   # Utility functions
│   │   └── auth.ts              # Authentication utilities
│   ├── favicon.ico              # App favicon
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── assets/                      # Static assets
│   └── foodio.jpg              # Brand images
├── components/                  # Reusable components
│   ├── AddCategoryModal.tsx    # Category creation modal
│   └── AddNewItemModal.tsx     # Menu item creation modal
├── lib/                         # Libraries & configurations
│   ├── api/                     # API services
│   │   ├── client.ts           # Axios configuration
│   │   ├── auth.ts             # Auth API calls
│   │   ├── menu.ts             # Menu API calls
│   │   ├── order.ts            # Order API calls
│   │   └── category.ts         # Category API calls
│   └── validations/             # Zod schemas
│       ├── auth.ts             # Auth validation schemas
│       ├── menu.ts             # Menu validation schemas
│       ├── category.ts         # Category validation schemas
│       └── order.ts            # Order validation schemas
├── node_modules/                # Dependencies
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies
├── package-lock.json           # Locked dependencies
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Project documentation
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔐 Authentication Flow

### User Registration
1. User fills registration form
2. Form validated with Zod schema
3. API request sent via Axios
4. JWT token received and stored in localStorage
5. User redirected to appropriate dashboard

### User Login
1. User enters email and password
2. Credentials validated with Zod
3. JWT token received and stored
4. Token decoded to get user role
5. Redirected based on role:
   - Admin → `/admin`
   - Customer → `/customer/Dashboard`

### Protected Routes
- Route groups enforce authentication
- Middleware checks for valid JWT token
- Role-based access control for admin routes
- Automatic redirect to `/auth` if unauthenticated

## 📝 API Integration with Axios

- Centralized Axios client configuration in `lib/api/client.ts`
- Request interceptors automatically add JWT tokens
- Response interceptors handle authentication errors
- Separate service modules for different API domains (auth, menu, order, category)
- Type-safe API calls with TypeScript interfaces

## ✅ Form Validation with Zod

- Schema-based validation for all forms
- Type-safe form inputs with TypeScript inference
- Real-time validation feedback
- Integration with React Hook Form
- Validation schemas organized by feature in `lib/validations/`

## 🎯 Key Features Implementation

### 1. Route Groups
- `(admin)` - Admin dashboard and management pages
- `(auth)` - Authentication pages
- `(customer)` - Customer-facing pages
- Shared layouts within each group

### 2. Menu Browsing (Customer)
- Server components for initial data
- Client components for interactivity
- Category filtering
- Add to cart functionality

### 3. Order Management (Admin)
- View all orders in a table
- Update order status
- Real-time status updates
- Order filtering and search

### 4. Menu Item Management (Admin)
- CRUD operations via modals
- Image upload functionality
- Availability toggle
- Category assignment

### 5. Modal Components
- **AddCategoryModal**: Create/edit categories
- **AddNewItemModal**: Create/edit menu items
- Reusable modal wrapper
- Form validation with Zod

## 🎨 Styling with Tailwind CSS

### Configuration
- Custom color palette for brand consistency
- Responsive breakpoints: sm, md, lg, xl, 2xl
- Utility-first approach for rapid development
- Custom components and plugins as needed

### Responsive Design
- Mobile-first approach
- Flexible layouts with Grid and Flexbox
- Optimized for all screen sizes

## 🌐 Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Optional: Image Upload Service
NEXT_PUBLIC_CLOUDINARY_URL=your_cloudinary_url
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```

## 🚀 Performance Optimization

- **Server Components**: Default for better performance
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Dynamic imports for heavy components
- **API Caching**: Axios interceptors with cache headers

## 🔒 Security Features

- JWT token validation
- XSS protection with input sanitization
- CSRF protection
- Role-based route protection
- Secure password handling
- HTTP-only cookies support

## 🐛 Troubleshooting

### Common Issues

**Axios Request Fails**
- Check if backend is running on correct port
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend

**Zod Validation Not Working**
- Ensure `@hookform/resolvers` is installed
- Check schema is correctly defined
- Verify resolver is passed to `useForm`

**JWT Decode Error**
- Ensure `jwt-decode` is installed
- Check token format
- Verify token is valid JWT

**Environment Variables Not Loading**
- Restart dev server after creating `.env.local`
- Ensure variables start with `NEXT_PUBLIC_`
- Check file is in root directory

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Contact the development team
- Check documentation at `/docs`

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, Axios, and Zod
