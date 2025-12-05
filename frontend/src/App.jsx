import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Shorts from './pages/Shorts.jsx';
import ArticleViewer from './pages/ArticleViewer.jsx';
import OnboardingModal from './components/OnboardingModal.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BookmarkProvider } from './contexts/BookmarkContext.jsx';
import { OnboardingProvider } from './contexts/OnboardingContext.jsx';

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<OnboardingProvider>
					<BookmarkProvider>
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/shorts"
							element={<Shorts />}
						/>
						<Route
							path="/article-viewer"
							element={<ArticleViewer />}
						/>
					</Routes>
						<OnboardingModal />
					</BookmarkProvider>
				</OnboardingProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}
