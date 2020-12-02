import React from 'react';
import { Block, Button, theme } from 'galio-framework';
import { nowTheme } from '../constants';

const SocialButtons = props => (
    <Block row>                      
        <Button
            round
            onlyIcon
            shadowless
            icon="facebook"
            iconFamily="Font-Awesome"
            iconColor={theme.COLORS.WHITE}
            iconSize={theme.SIZES.BASE * 1.625}
            color={nowTheme.COLORS.FACEBOOK}
            style={[props.style.social, props.style.shadow]}
            onPress={props.signInWithFacebook}
        />
        <Button
            round
            onlyIcon
            shadowless
            icon="google"
            iconFamily="Font-Awesome"
            iconColor={theme.COLORS.WHITE}
            iconSize={theme.SIZES.BASE * 1.625}
            color={nowTheme.COLORS.GOOGLE}
            style={[props.style.social, props.style.shadow]}
            onPress={props.signInWithGoogle}
        />
    </Block>
);

export default SocialButtons;