import Link from 'next/link';

export default function PermissionError() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">You don't have permission!</h1>
            <p className="text-lg text-gray-600 mb-6">You don't have access to this page. Go back to the homepage.</p>
            <Link
                href="/products"
                className="text-lg text-blue-500 bg-gray-200 border border-blue-500 px-6 py-3 rounded-md hover:bg-blue-100 transition-all"
            >
                Go Back to Home
            </Link>
        </div>
    );
}
