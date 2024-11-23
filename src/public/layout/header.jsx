import styled from "styled-components";

export default function Header() {
    return (
        <>
            <S.Container>
                <S.Logo>Img</S.Logo>
                <S.Title>Git Issue.net</S.Title>
            </S.Container>

            <hr />
            <S.Container>
                <S.RepoTitle>Repository</S.RepoTitle>
                <S.CurrentRepo>placeholder/placeholder</S.CurrentRepo>
            </S.Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 3em;
`;
const Logo = styled.div``;
const Title = styled.div``;
const RepoTitle = styled.div`
    margin-right: 3em;
`;
const CurrentRepo = styled.div``;

const S = {
    Container,
    Logo,
    Title,
    RepoTitle,
    CurrentRepo,
};
