import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import OnboardingSwipe from './pages/OnboardingSwipe.jsx';
import Shorts from './pages/Shorts.jsx';
import Quests from './pages/Quests.jsx';
import Chatbot from './components/Chatbot.jsx';
import { BookmarkProvider } from './contexts/BookmarkContext.jsx';
import { OnboardingProvider, useOnboarding } from './contexts/OnboardingContext.jsx';

// Protected Route Component
function ProtectedRoute({ children }) {
	const { isOnboardingComplete } = useOnboarding();
	
	if (!isOnboardingComplete) {
		return <Navigate to="/onboarding" replace />;
	}
	
	return children;
}

// Public Route Component (redirects if already onboarded)
function PublicRoute({ children }) {
	const { isOnboardingComplete } = useOnboarding();
	
	if (isOnboardingComplete) {
		return <Navigate to="/" replace />;
	}
	
	return children;
}

export default function App() {
	return (
		<BrowserRouter>
			<OnboardingProvider>
				<BookmarkProvider>
					<Routes>
						<Route 
							path="/onboarding" 
							element={
								<PublicRoute>
									<OnboardingSwipe />
								</PublicRoute>
							} 
						/>
						<Route 
							path="/shorts" 
							element={
								<ProtectedRoute>
									<Shorts />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="/quests" 
							element={
								<ProtectedRoute>
									<Quests />
								</ProtectedRoute>
							} 
						/>
						<Route 
							path="/" 
							element={
								<ProtectedRoute>
									<Home />
									<Chatbot />
								</ProtectedRoute>
							} 
						/>
					</Routes>
				</BookmarkProvider>
			</OnboardingProvider>
		</BrowserRouter>
	);
}
