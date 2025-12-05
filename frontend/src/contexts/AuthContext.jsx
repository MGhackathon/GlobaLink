import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// localStorage에서 초기 상태를 동기적으로 읽기
const getInitialAuthState = () => {
	if (typeof window === 'undefined') return false;
	const saved = localStorage.getItem('isLoggedIn');
	return saved === 'true';
};

const getInitialUserName = () => {
	if (typeof window === 'undefined') return '홍길동';
	const savedName = localStorage.getItem('userName');
	return savedName || '홍길동';
};

export function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(getInitialAuthState);
	const [userName, setUserName] = useState(getInitialUserName);
	const [showOnboardingModal, setShowOnboardingModal] = useState(false);

	// 로그인 처리 - 매번 온보딩 모달 표시
	const login = () => {
		setIsLoggedIn(true);
		localStorage.setItem('isLoggedIn', 'true');
		localStorage.setItem('userName', userName);
		setShowOnboardingModal(true); // 로그인 시마다 온보딩 모달 표시
	};

	// 온보딩 모달 닫기
	const closeOnboardingModal = () => {
		setShowOnboardingModal(false);
	};

	return (
		<AuthContext.Provider value={{
			isLoggedIn,
			userName,
			showOnboardingModal,
			login,
			closeOnboardingModal,
			setUserName
		}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
}
