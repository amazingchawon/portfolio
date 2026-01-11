---
title: 개발바닥
summary: IT 강의를 비교하고 학습 과정을 기록할 수 있는 개발자 전용 SNS 서비스
period: 2025.01.06 – 2025.02.21
team: 6명
role: PM, Frontend, Designer,
tech: [Vue.js, Tailwind CSS, Pinia, Firebase OAuth]
github: https://github.com/amazingchawon/Devoot
---

## Key Screens

![화면 1](/projects/devoot/devoot-1.png)

![화면 2](/projects/devoot/devoot-2.png)

## Overview

개발바닥은 여러 플랫폼에 흩어져 있는 IT 강의를 한 곳에서 비교하고,
학습 진행 상황과 기록을 관리할 수 있도록 만든 개발자 전용 SNS 서비스입니다.
강의 관리 기능과 사용자 간 네트워크를 결합해 학습 동기 부여를 목표로 했습니다.

## Key Features

- 여러 강의 플랫폼의 강의를 한 곳에서 비교·관리할 수 있는 구조 설계
- 강의 커리큘럼과 연동된 TODO 기반 학습 진행 관리
- 팔로우 기능을 통한 사용자 간 학습 네트워크 구성

## What I did

- Firebase OAuth 기반 Google / GitHub 간편 로그인 구현
- Pinia를 활용한 사용자·강의 전역 상태 관리
- Axios 인스턴스 커스터마이징 및 공통 에러 핸들링 구조 설계
- 로그인, 강의 상세, 타임라인, 관리자 페이지 등 반응형 UI 구현
- PM 역할로 일정 관리 및 Jira 기반 태스크 분배

## Problem & Solution

### 인증 이후 사용자 정보 동기화 문제

Firebase의 `onAuthStateChanged`는 인증 상태만 관리하고,
서비스에 필요한 사용자 정보는 별도의 API 요청이 필요했습니다.

이를 해결하기 위해:

- 인증 상태 확인과 사용자 정보 로딩의 역할을 명확히 분리
- 로그인 상태 확인 후 `fetchUser`를 직접 호출해 사용자 정보 로딩
- Pinia 스토어에서 인증·사용자 상태를 일관되게 관리

그 결과 인증 직후 상태 불일치 문제를 해결하고,
토큰 만료 상황에서도 안정적인 사용자 경험을 유지할 수 있었습니다.

## What I Learned

- OAuth 인증 흐름과 인증 상태 / 사용자 데이터 분리의 중요성
- Pinia 기반 전역 상태 설계 경험
- UX 관점에서 인증 예외 상황을 고려하는 습관
