import { HTMLAttributes, ImgHTMLAttributes } from "react";
import styled from "styled-components";

export interface AvatarProps {
    avatarUrl: string;
    alt?: string;
}

const AvatarWrapper = styled.div`
    display: inline-block;
    min-width: 2rem;
    position: relative;

    // Make the container square with a vertical padding that is
    // the same size as its width
    :after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }

    .avatar__image {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        height: 100%;
        width: 100%;

        border-radius: 100%;

        object-fit: cover;
    }
`;

export function Avatar({
    avatarUrl,
    alt,
    ...wrapperProps
}: AvatarProps & HTMLAttributes<HTMLDivElement>) {
    return (
        <AvatarWrapper
            {...wrapperProps}
            className={`avatar ${wrapperProps.className ?? ""}`}
        >
            <img alt={alt} className="avatar__image" src={avatarUrl} />
        </AvatarWrapper>
    );
}
