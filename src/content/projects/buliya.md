---
title: 불이야
summary: 비상 상황에서 빠른 판단을 돕는 지하상가 화재 감지 및 대피 안내 서비스
period: 2025.3.24 - 2025.4.11
role: Frontend, PM
team: 6명
tech: [React, Tailwind CSS, JavaScript, MapBox]
github: https://github.com/amazingchawon/subway-fire-escape
---

## Key Screens

![화면 1](/projects/buliya/buliya-1.png)

![화면 2](/projects/buliya/buliya-2.png)

![화면 3](/projects/buliya/buliya-3.png)

![화면 4](/projects/buliya/buliya-4.png)

## Overview

불이야는 지하 상가 화재와 같은 비상 상황에서  
사용자가 현재 상황과 대피 정보를 빠르게 파악하기 어렵다는 문제에서 출발한 서비스입니다.

실시간 CCTV와 지도 정보를 기반으로  
비상 상황을 직관적으로 시각화하는 화면 흐름과 관리자용 웹 UI를 구현했습니다.

## Key Features

- 화재 발생 시 실시간 상황 이미지와 알람 제공
- 사용자 위치를 기준으로 가장 안전한 대피 경로 안내
- 관리자 웹을 통한 설비·경로 등록 및 관리

## What I Did

- 비상 상황에서도 한눈에 이해할 수 있도록 지도 중심 화면 흐름 설계
- 화재·대피 상황에 따라 시각적 우선순위를 다르게 표현하는 강조 규칙 정의
- 이미지 기반 실내 지도를 Mapbox에 적용해 직관적인 위치 인식 제공
- 관리자용 웹 페이지를 구현해 설비 및 경로를 관리할 수 있도록 구성

## Key Points

- 지도에서 상황 → 대피 정보로 이어지는 정보 구조를 단순화
- 사용자의 판단 시간을 줄이기 위한 강조 규칙 설계

## Problem & Solution

### 이미지 기반 지도에서 좌표 관리 문제

일반 지도 데이터가 아닌 하나의 큰 이미지 위에서
마커와 경로를 관리해야 했기 때문에 좌표 체계 설계가 필요했습니다.

이를 해결하기 위해:

- 이미지 픽셀 좌표를 기준으로 가상의 좌표계를 설계
- 픽셀 좌표 → 위도/경도 변환 로직을 직접 구현
- Mapbox 이벤트 시스템과 결합해 마커·간선 클릭 인터랙션 처리

또한 Mapbox 이벤트 핸들러 등록·해제 과정에서
이벤트 누수와 성능 문제를 방지하기 위해 `useRef`를 활용해 상태를 관리했습니다.

## What I Learned

- Mapbox GL의 이벤트 처리 구조와 좌표계 이해
- React에서 `useRef`와 `useEffect`를 함께 사용할 때의 동기화 문제
- 긴급 상황 UX에서 직관성이 얼마나 중요한지에 대한 경험
