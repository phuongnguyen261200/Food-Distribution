import React from 'react';
import {Animated, TouchableOpacityProps} from 'react-native';
import styled from '../styles/styled';
import {useToggleAnimate} from './animation/FadeAnimation';

type ButtonProps = TouchableOpacityProps & InsideTouch;

const Button = (props: ButtonProps) => {
	const {children, loading} = props;

	const {interpolate} = useToggleAnimate({outputRange: [0, 1]});

	return (
		<ViewContainer {...props} style={[{opacity: interpolate}, props.style]}>
			<Container activeOpacity={0.6} disabled={loading} {...props}>
				{!loading ? (
					typeof children === 'string' ? (
						<TextButton {...props}>{children}</TextButton>
					) : (
						children
					)
				) : (
					<Loading size={'small'} color={'#fff'} />
				)}
			</Container>
		</ViewContainer>
	);
};
const ViewContainer = styled(Animated.View)``;
const Loading = styled.ActivityIndicator`
	height: ${(props) => props.theme.scapingElement};
`;
const Container = styled.TouchableOpacity<ButtonProps>`
	padding-vertical: ${(props) => props.theme.scapingElement};
	background-color: ${({clean, outline, solidWhite, theme}) =>
		clean || outline ? 'transparent' : solidWhite ? theme.colors.white : theme.colors.main};
	border-radius: ${(props) => props.theme.borderRadius};
	border-width: ${({outline}) => (outline ? 1 : 0)};
	border-color: ${({outline, theme}) => (outline ? theme.colors.main : 'transparent')};
	align-items: center;
	opacity: ${({disabled}) => (disabled ? 0.7 : 1)};
`;
const TextButton = styled.Text<ButtonProps>`
	font-style: normal;
	font-weight: ${(props) => props.theme.font.bold};
	font-size: ${(props) => props.theme.font.fontLarge};
	text-align: center;
	color: ${({solidWhite, clean, outline, theme}) =>
		solidWhite || clean || outline ? theme.colors.main : theme.colors.white};
`;

export default Button;
