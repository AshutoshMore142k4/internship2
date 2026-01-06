import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/20 backdrop-blur-md bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold gradient-text">FlowTask</span>
            </div>
            <div className="flex gap-3">
              <Link href="/login" className="px-5 py-2.5 text-dark-700 hover:text-primary-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-8 animate-scale-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              <span className="text-sm font-medium text-dark-700">Now with AI-powered task suggestions</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
              <span className="gradient-text">Organize</span> your work,<br />
              <span className="text-dark-900">amplify</span> your <span className="gradient-text">impact</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-dark-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The intelligent task management platform designed for modern teams. 
              Plan smarter, execute faster, achieve more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/register"
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 btn-glow"
              >
                <span className="flex items-center gap-2">
                  Start Free Trial
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 glass text-dark-700 rounded-2xl font-semibold text-lg hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                View Demo
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex justify-center items-center gap-8 text-sm text-dark-600 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                </div>
                <span className="font-medium">10k+ active users</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20">
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative glass rounded-3xl p-2 shadow-2xl">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                  <div className="bg-dark-800 px-6 py-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl animate-pulse"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl"></div>
                      <div className="h-32 bg-gradient-to-br from-accent-100 to-accent-50 rounded-xl"></div>
                      <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-white border-2 border-gray-200 rounded-xl"></div>
                      <div className="h-16 bg-white border-2 border-gray-200 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to level up?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Join thousands of professionals crushing their goals with FlowTask.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-10 py-5 bg-white text-primary-700 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Start Free Trial
              </Link>
            </div>
            <p className="mt-6 text-primary-200 text-sm">
              ✓ Free forever  ✓ No credit card  ✓ Cancel anytime
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold">FlowTask</span>
              </div>
              <p className="text-gray-400 max-w-md">
                The intelligent task management platform for modern teams.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FlowTask. Crafted for peak productivity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
