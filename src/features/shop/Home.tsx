import styled from "styled-components";
import Style2 from "../../components/item/style2";

const HOME = styled.div`
    font-size: 1rem;
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
    .ShowItem {
        margin: 0 0 0 1rem;
        background-color: #ffffff;
        width: 100%;
        padding: 1rem;
        height: 95vh;
        overflow: auto;
    }
`;

const Home = () => {
    return (
        <HOME>
            <div className="ShowItem">
                <Style2 />
            </div>
        </HOME>
    );
};

export default Home;
