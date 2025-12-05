import React, { createContext, useContext, useState, useEffect } from 'react';

const OnboardingContext = createContext();

// localStorage에서 초기 상태를 동기적으로 읽기
const getInitialOnboardingState = () => {
	if (typeof window === 'undefined') return false;
	const saved = localStorage.getItem('onboardingComplete');
	return saved === 'true';
};

const getInitialInterests = () => {
	if (typeof window === 'undefined') return { interested: [], notInterested: [] };
	const savedInterests = localStorage.getItem('userInterests');
	if (savedInterests) {
		try {
			return JSON.parse(savedInterests);
		} catch (e) {
			console.error('Failed to parse saved interests', e);
			return { interested: [], notInterested: [] };
		}
	}
	return { interested: [], notInterested: [] };
};

export function OnboardingProvider({ children }) {
	const [isOnboardingComplete, setIsOnboardingComplete] = useState(getInitialOnboardingState);
	const [interests, setInterests] = useState(getInitialInterests);

	const markOnboardingComplete = () => {
		setIsOnboardingComplete(true);
		localStorage.setItem('onboardingComplete', 'true');
	};

	const addInterest = (articleId, isInterested) => {
		setInterests(prev => {
			const newInterests = {
				interested: isInterested 
					? [...prev.interested.filter(id => id !== articleId), articleId]
					: prev.interested.filter(id => id !== articleId),
				notInterested: !isInterested
					? [...prev.notInterested.filter(id => id !== articleId), articleId]
					: prev.notInterested.filter(id => id !== articleId)
			};
			localStorage.setItem('userInterests', JSON.stringify(newInterests));
			return newInterests;
		});
	};

	const resetOnboarding = () => {
		setIsOnboardingComplete(false);
		setInterests({ interested: [], notInterested: [] });
		localStorage.removeItem('onboardingComplete');
		localStorage.removeItem('userInterests');
	};

	return (
		<OnboardingContext.Provider value={{
			isOnboardingComplete,
			interests,
			markOnboardingComplete,
			addInterest,
			resetOnboarding
		}}>
			{children}
		</OnboardingContext.Provider>
	);
}

export function useOnboarding() {
	const context = useContext(OnboardingContext);
	if (!context) {
		throw new Error('useOnboarding must be used within OnboardingProvider');
	}
	return context;
}
