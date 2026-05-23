I want you to refactor my current folder structure to this:

📦 Blossom_Flowers
┣ 📂 client
┃ ┣ 📂 public
┃ ┃ ┣ 📄 favicon.svg
┃ ┃ ┣ 📄 icons.svg
┃ ┃ ┗ 📄 robots.txt
┃ ┃
┃ ┣ 📂 src
┃ ┃ ┣ 📂 assets
┃ ┃ ┃ ┣ 📂 images
┃ ┃ ┃ ┣ 📂 icons
┃ ┃ ┃ ┣ 📂 banners
┃ ┃ ┃ ┗ 📂 videos
┃ ┃ ┃
┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┣ 📂 common
┃ ┃ ┃ ┃ ┣ 📄 Navbar.jsx
┃ ┃ ┃ ┃ ┣ 📄 Footer.jsx
┃ ┃ ┃ ┃ ┣ 📄 Loader.jsx
┃ ┃ ┃ ┃ ┗ 📄 EmptyState.jsx
┃ ┃ ┃ ┃
┃ ┃ ┃ ┣ 📂 ui
┃ ┃ ┃ ┃ ┣ 📄 button.jsx
┃ ┃ ┃ ┃ ┣ 📄 modal.jsx
┃ ┃ ┃ ┃ ┣ 📄 toast.jsx
┃ ┃ ┃ ┃ ┣ 📄 input.jsx
┃ ┃ ┃ ┃ ┣ 📄 select.jsx
┃ ┃ ┃ ┃ ┣ 📄 dialog.jsx
┃ ┃ ┃ ┃ ┣ 📄 table.jsx
┃ ┃ ┃ ┃ ┣ 📄 pagination.jsx
┃ ┃ ┃ ┃ ┗ 📄 skeleton.jsx
┃ ┃ ┃
┃ ┃ ┣ 📂 features
┃ ┃ ┃ ┣ 📂 home
┃ ┃ ┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┃ ┃ ┣ 📄 Hero.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 FeaturedProducts.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 Categories.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 Testimonials.jsx
┃ ┃ ┃ ┃ ┣ 📂 pages
┃ ┃ ┃ ┃ ┃ ┗ 📄 Home.jsx
┃ ┃ ┃ ┃ ┗ 📂 services
┃ ┃ ┃ ┃ ┃ ┗ 📄 homeApi.js
┃ ┃ ┃ ┃
┃ ┃ ┃ ┣ 📂 products
┃ ┃ ┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┃ ┃ ┣ 📄 ProductCard.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 ProductGallery.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 ProductFilters.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 ProductReviews.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 ProductVariants.jsx
┃ ┃ ┃ ┃ ┣ 📂 hooks
┃ ┃ ┃ ┃ ┃ ┗ 📄 useProducts.js
┃ ┃ ┃ ┃ ┣ 📂 pages
┃ ┃ ┃ ┃ ┃ ┣ 📄 Products.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 ProductDetails.jsx
┃ ┃ ┃ ┃ ┣ 📂 services
┃ ┃ ┃ ┃ ┃ ┗ 📄 productApi.js
┃ ┃ ┃ ┃ ┗ 📂 utils
┃ ┃ ┃ ┃ ┃ ┗ 📄 productHelpers.js
┃ ┃ ┃ ┃
┃ ┃ ┃ ┣ 📂 cart
┃ ┃ ┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┃ ┃ ┣ 📄 CartItem.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 CartSummary.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 QuantityButton.jsx
┃ ┃ ┃ ┃ ┣ 📂 context
┃ ┃ ┃ ┃ ┃ ┗ 📄 CartContext.jsx
┃ ┃ ┃ ┃ ┣ 📂 pages
┃ ┃ ┃ ┃ ┃ ┗ 📄 Cart.jsx
┃ ┃ ┃ ┃ ┗ 📂 services
┃ ┃ ┃ ┃ ┃ ┗ 📄 cartApi.js
┃ ┃ ┃ ┃
┃ ┃ ┃ ┣ 📂 checkout
┃ ┃ ┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┃ ┃ ┣ 📄 CheckoutForm.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 PaymentMethod.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 ShippingForm.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 OrderSummary.jsx
┃ ┃ ┃ ┃ ┣ 📂 pages
┃ ┃ ┃ ┃ ┃ ┗ 📄 Checkout.jsx
┃ ┃ ┃ ┃ ┗ 📂 services
┃ ┃ ┃ ┃ ┃ ┗ 📄 paymentApi.js
┃ ┃ ┃ ┃
┃ ┃ ┃ ┣ 📂 booking
┃ ┃ ┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┃ ┃ ┣ 📄 BookingForm.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 EventPackageCard.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 CalendarPicker.jsx
┃ ┃ ┃ ┃ ┣ 📂 pages
┃ ┃ ┃ ┃ ┃ ┗ 📄 Booking.jsx
┃ ┃ ┃ ┃ ┗ 📂 services
┃ ┃ ┃ ┃ ┃ ┗ 📄 bookingApi.js
┃ ┃ ┃ ┃
┃ ┃ ┃ ┣ 📂 auth
┃ ┃ ┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┃ ┃ ┣ 📄 LoginForm.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 RegisterForm.jsx
┃ ┃ ┃ ┃ ┣ 📂 context
┃ ┃ ┃ ┃ ┃ ┗ 📄 AuthContext.jsx
┃ ┃ ┃ ┃ ┣ 📂 hooks
┃ ┃ ┃ ┃ ┃ ┗ 📄 useAuth.js
┃ ┃ ┃ ┃ ┣ 📂 pages
┃ ┃ ┃ ┃ ┃ ┣ 📄 Login.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 Register.jsx
┃ ┃ ┃ ┃ ┗ 📂 services
┃ ┃ ┃ ┃ ┃ ┗ 📄 authApi.js
┃ ┃ ┃ ┃
┃ ┃ ┃ ┗ 📂 admin
┃ ┃ ┃ ┃ ┣ 📂 components
┃ ┃ ┃ ┃ ┃ ┣ 📄 Sidebar.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 DashboardCard.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 StatsCard.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 DataTable.jsx
┃ ┃ ┃ ┃ ┣ 📂 pages
┃ ┃ ┃ ┃ ┃ ┣ 📄 Dashboard.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 ProductsManagement.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 OrdersManagement.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 BookingsManagement.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 CustomersManagement.jsx
┃ ┃ ┃ ┃ ┃ ┣ 📄 Reports.jsx
┃ ┃ ┃ ┃ ┃ ┗ 📄 Settings.jsx
┃ ┃ ┃ ┃ ┗ 📂 services
┃ ┃ ┃ ┃ ┃ ┗ 📄 adminApi.js
┃ ┃ ┃
┃ ┃ ┣ 📂 hooks
┃ ┃ ┃ ┣ 📄 useDebounce.js
┃ ┃ ┃ ┣ 📄 useLocalStorage.js
┃ ┃ ┃ ┗ 📄 usePagination.js
┃ ┃ ┃
┃ ┃ ┣ 📂 layouts
┃ ┃ ┃ ┣ 📄 MainLayout.jsx
┃ ┃ ┃ ┣ 📄 AdminLayout.jsx
┃ ┃ ┃ ┗ 📄 AuthLayout.jsx
┃ ┃ ┃
┃ ┃ ┣ 📂 routes
┃ ┃ ┃ ┣ 📄 AppRoutes.jsx
┃ ┃ ┃ ┣ 📄 ProtectedRoute.jsx
┃ ┃ ┃ ┗ 📄 AdminRoute.jsx
┃ ┃ ┃
┃ ┃ ┣ 📂 services
┃ ┃ ┃ ┣ 📄 axios.js
┃ ┃ ┃ ┣ 📄 apiClient.js
┃ ┃ ┃ ┗ 📄 uploadService.js
┃ ┃ ┃
┃ ┃ ┣ 📂 constants
┃ ┃ ┃ ┣ 📄 routes.js
┃ ┃ ┃ ┣ 📄 roles.js
┃ ┃ ┃ ┣ 📄 orderStatus.js
┃ ┃ ┃ ┗ 📄 apiEndpoints.js
┃ ┃ ┃
┃ ┃ ┣ 📂 lib
┃ ┃ ┃ ┗ 📄 utils.js
┃ ┃ ┃
┃ ┃ ┣ 📂 utils
┃ ┃ ┃ ┣ 📄 formatPrice.js
┃ ┃ ┃ ┣ 📄 validators.js
┃ ┃ ┃ ┣ 📄 generateSlug.js
┃ ┃ ┃ ┗ 📄 formatDate.js
┃ ┃ ┃
┃ ┃ ┣ 📂 styles
┃ ┃ ┃ ┣ 📄 index.css
┃ ┃ ┃ ┣ 📄 globals.css
┃ ┃ ┃ ┗ 📄 variables.css
┃ ┃ ┃
┃ ┃ ┣ 📄 App.jsx
┃ ┃ ┣ 📄 main.jsx
┃ ┃ ┗ 📄 vite.config.js
┃ ┃
┃ ┣ 📄 components.json
┃ ┣ 📄 jsconfig.json
┃ ┣ 📄 eslint.config.js
┃ ┣ 📄 package.json
┃ ┗ 📄 README.md
┃
┣ 📂 server
┃ ┣ 📂 src
┃ ┃ ┣ 📂 config
┃ ┃ ┃ ┣ 📄 db.js
┃ ┃ ┃ ┣ 📄 env.js
┃ ┃ ┃ ┣ 📄 cors.js
┃ ┃ ┃ ┗ 📄 multer.js
┃ ┃ ┃
┃ ┃ ┣ 📂 controllers
┃ ┃ ┃ ┣ 📄 authController.js
┃ ┃ ┃ ┣ 📄 productController.js
┃ ┃ ┃ ┣ 📄 categoryController.js
┃ ┃ ┃ ┣ 📄 orderController.js
┃ ┃ ┃ ┣ 📄 bookingController.js
┃ ┃ ┃ ┣ 📄 paymentController.js
┃ ┃ ┃ ┣ 📄 customerController.js
┃ ┃ ┃ ┗ 📄 reportController.js
┃ ┃ ┃
┃ ┃ ┣ 📂 middleware
┃ ┃ ┃ ┣ 📄 authMiddleware.js
┃ ┃ ┃ ┣ 📄 roleMiddleware.js
┃ ┃ ┃ ┣ 📄 errorMiddleware.js
┃ ┃ ┃ ┣ 📄 uploadMiddleware.js
┃ ┃ ┃ ┣ 📄 validateMiddleware.js
┃ ┃ ┃ ┗ 📄 rateLimitMiddleware.js
┃ ┃ ┃
┃ ┃ ┣ 📂 models
┃ ┃ ┃ ┣ 📄 User.js
┃ ┃ ┃ ┣ 📄 Product.js
┃ ┃ ┃ ┣ 📄 Category.js
┃ ┃ ┃ ┣ 📄 Cart.js
┃ ┃ ┃ ┣ 📄 Order.js
┃ ┃ ┃ ┣ 📄 OrderItem.js
┃ ┃ ┃ ┣ 📄 Booking.js
┃ ┃ ┃ ┣ 📄 Payment.js
┃ ┃ ┃ ┗ 📄 Review.js
┃ ┃ ┃
┃ ┃ ┣ 📂 routes
┃ ┃ ┃ ┣ 📄 authRoutes.js
┃ ┃ ┃ ┣ 📄 productRoutes.js
┃ ┃ ┃ ┣ 📄 categoryRoutes.js
┃ ┃ ┃ ┣ 📄 cartRoutes.js
┃ ┃ ┃ ┣ 📄 orderRoutes.js
┃ ┃ ┃ ┣ 📄 bookingRoutes.js
┃ ┃ ┃ ┣ 📄 paymentRoutes.js
┃ ┃ ┃ ┣ 📄 customerRoutes.js
┃ ┃ ┃ ┗ 📄 reportRoutes.js
┃ ┃ ┃
┃ ┃ ┣ 📂 services
┃ ┃ ┃ ┣ 📄 authService.js
┃ ┃ ┃ ┣ 📄 productService.js
┃ ┃ ┃ ┣ 📄 paymentService.js
┃ ┃ ┃ ┣ 📄 emailService.js
┃ ┃ ┃ ┣ 📄 qrService.js
┃ ┃ ┃ ┗ 📄 analyticsService.js
┃ ┃ ┃
┃ ┃ ┣ 📂 validations
┃ ┃ ┃ ┣ 📄 authValidation.js
┃ ┃ ┃ ┣ 📄 productValidation.js
┃ ┃ ┃ ┣ 📄 orderValidation.js
┃ ┃ ┃ ┗ 📄 bookingValidation.js
┃ ┃ ┃
┃ ┃ ┣ 📂 utils
┃ ┃ ┃ ┣ 📄 logger.js
┃ ┃ ┃ ┣ 📄 response.js
┃ ┃ ┃ ┣ 📄 generateToken.js
┃ ┃ ┃ ┣ 📄 pagination.js
┃ ┃ ┃ ┗ 📄 asyncHandler.js
┃ ┃ ┃
┃ ┃ ┣ 📂 uploads
┃ ┃ ┃ ┣ 📂 products
┃ ┃ ┃ ┣ 📂 users
┃ ┃ ┃ ┣ 📂 payments
┃ ┃ ┃ ┗ 📂 bookings
┃ ┃ ┃
┃ ┃ ┣ 📂 database
┃ ┃ ┃ ┣ 📂 migrations
┃ ┃ ┃ ┣ 📂 seeders
┃ ┃ ┃ ┗ 📄 florist_system.sql
┃ ┃ ┃
┃ ┃ ┣ 📄 app.js
┃ ┃ ┗ 📄 server.js
┃ ┃
┃ ┣ 📄 .env
┃ ┣ 📄 .env.example
┃ ┣ 📄 package.json
┃ ┗ 📄 README.md
┃
┣ 📂 docs
┃ ┣ 📄 api-documentation.md
┃ ┣ 📄 database-schema.md
┃ ┣ 📄 deployment-guide.md
┃ ┗ 📄 system-architecture.md
┃
┣ 📂 tasks
┃ ┣ 📄 todo.md
┃ ┣ 📄 lessons.md
┃ ┣ 📄 production-readiness-prd.md
┃ ┗ 📄 bug-tracker.md
┃
┣ 📄 .gitignore
┣ 📄 WORKFLOW.md
┣ 📄 README.md
┗ 📄 package.json


NOTE: don't copy the files inside the folder, only the folder structure