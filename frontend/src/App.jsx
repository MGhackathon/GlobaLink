import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Shorts from './pages/Shorts.jsx';
import Quests from './pages/Quests.jsx';
import ArticleViewer from './pages/ArticleViewer.jsx';
import Chatbot from './components/Chatbot.jsx';
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
								element={
									<>
										<Home />
										<Chatbot />
									</>
								}
							/>
							<Route
								path="/shorts"
								element={<Shorts />}
							/>
							<Route
								path="/quests"
								element={<Quests />}
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
