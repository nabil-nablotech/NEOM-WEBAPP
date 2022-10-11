import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  RobotoMediumMerino20px,
  RobotoLightMerino50px,
  RobotoNormalLicorice16px,
  ValignTextMiddle,
} from "./styledMixins";
import "./style.css";
import "../../globals.css"
import "../../styleguide.css"
import UserMenuComponent from "../../components/UserMenu";
import WhiteCircle from "../../assets/images/WhiteCircle.svg";
import CustomSearchField from '../../components/SearchField/index';
import { RootState } from "../../store";
import useAuth from "../../hooks/useAuth";
import styles from './index.module.css'
import { getRole } from "../../utils/storage/storage";
import { useNavigate } from "react-router-dom";
import { tabNameProps } from "../../types/SearchResultsTabsProps";
import Header from "../../components/Header";

const landingPageData = {
  overlapGroup4: "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/rectangle-125-1@1x.png",
  image2: "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/image-2-1@2x.png",
  iconSearch: "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/leading-icon@1x.png",
  spanText1: "Search",
  iconLocation_Pin: "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/icons-settings-24px@1x.png",
  spanText2: "1,053",
  spanText3: "Places",
  spanText4: "1,043",
  spanText5: "Events",
  vector2: "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d1b8e7fe8e743e734b33a/img/vector@1x.png",
  spanText6: "220",
  spanText7: "Library Items",
  vector3: "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/vector@1x.png",
  spanText8: "7,930",
  spanText9: "Media Items",
  iconUserWhite: WhiteCircle,
  icon: "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/icon@1x.png",
  iconSettings: "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/icon-button-settings@1x.png",
};

function LandingPage() {
  const {
    overlapGroup4,
    image2,
    iconSearch,
    spanText1,
    iconLocation_Pin,
    spanText2,
    spanText3,
    spanText4,
    spanText5,
    vector2,
    spanText6,
    spanText7,
    vector3,
    spanText8,
    spanText9,
  } = landingPageData;
  const {} = useAuth();
  const {data} = useSelector((state: RootState) => state.login);

  const navigate = useNavigate();

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tabName: tabNameProps
  ) => {
    navigate(`search-results/${tabName}`)
  }
  
  if (!data) return null;
  return (
    <div className="container-center-horizontal">
      <Header screen= "landing"/>
      <div className="landing-page screen">
        <OverlapGroup4 style={{ backgroundImage: `url(${overlapGroup4})` }}>
          <Rectangle69></Rectangle69>
          <Frame2608172>
            <Image2 src={image2} alt="image 2" />
            {/* <SearchField>
              <Content>
                <IconSearch src={iconSearch} alt="icon-search" />
                <LabelText>
                  <span>
                    <span className="roboto-normal-licorice-16px">{spanText1}</span>
                  </span>
                </LabelText>
              </Content>
            </SearchField> */}
            
              {/* sx={{
                '& .MuiInputBase-input ' : {
                  backgroundColor: '#fff'
                }
              }}
              ref={searchRef}
            /> */}
            <CustomSearchField className={`${styles['custom-search-field']} ${styles['landing-page-search-field']}`}/>
            <Inventory>
              <Frame2608168 onClick={e => handleClick(e, 'Places')}>
                <IconLocationPin src={iconLocation_Pin} alt="icon-location_pin" />
                <OverlapGroup>
                  <Text1>
                    <span>
                      <span className="roboto-light-merino-50px">{spanText2}</span>
                    </span>
                  </Text1>
                  <Places>
                    <span className="roboto-medium-merino-20px">{spanText3}</span>
                  </Places>
                </OverlapGroup>
              </Frame2608168>
              <Frame2608169 onClick={e => handleClick(e, 'Events')}>
                <Vector
                  src="https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d1b90bcf8144ac5b76937/img/vector@1x.png"
                  alt="Vector"
                />
                <OverlapGroup1>
                  <Text2>
                    <span>
                      <span className="roboto-light-merino-50px">{spanText4}</span>
                    </span>
                  </Text2>
                  <Places>
                    <span className="roboto-medium-merino-20px">{spanText5}</span>
                  </Places>
                </OverlapGroup1>
              </Frame2608169>
              <Frame2608170 onClick={e => handleClick(e, 'Library')}>
                <Vector1 src={vector2} alt="Vector" />
                <OverlapGroup2>
                  <Number>
                    <span>
                      <span className="roboto-light-merino-50px">{spanText6}</span>
                    </span>
                  </Number>
                  <LibraryItems>
                    <span className="roboto-medium-merino-20px">{spanText7}</span>
                  </LibraryItems>
                </OverlapGroup2>
              </Frame2608170>
              <Frame2608171 onClick={e => handleClick(e, 'Media')}>
                <Vector2 src={vector3} alt="Vector" />
                <OverlapGroup3>
                  <Text3>
                    <span>
                      <span className="roboto-light-merino-50px">{spanText8}</span>
                    </span>
                  </Text3>
                  <MediaItems>
                    <span className="roboto-medium-merino-20px">{spanText9}</span>
                  </MediaItems>
                </OverlapGroup3>
              </Frame2608171>
            </Inventory>
          </Frame2608172>
        </OverlapGroup4>
        {/* <UserMenuComponent /> */}
      </div>
    </div>
  );
}

const OverlapGroup4 = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: relative;
  background-size: cover;
  background-position: 50% 50%;
  position:relative;
`;

const Rectangle69 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px none;
  mix-blend-mode: multiply;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1899999976158142) 0%, rgb(0, 0, 0) 100%);
  background-repeat: no-repeat;
`;

const Frame2608172 = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 868px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 328px;
  border: 1px none;
  @media (min-width: 575px) and (max-width: 1025px) {
    max-width: 100vw;
  }
`;

const Image2 = styled.img`
  width: 72px;
  height: 93px;
  object-fit: cover;
  margin-bottom: 2em;
`;

const SearchField = styled.div`
  margin-top: 40px;
  margin-right: 1px;
  display: flex;
  padding: 0 14px;
  align-items: flex-start;
  min-width: 381px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid;
  border-color: #e8e9e9;
`;

const Content = styled.div`
  height: 40px;
  display: flex;
  padding: 7px 0;
  align-items: center;
  min-width: 353px;
  gap: 9px;
  border: 1px none;
`;

const IconSearch = styled.img`
  width: 24px;
  height: 24px;
  align-self: flex-end;
`;

const LabelText = styled.div`
  ${ValignTextMiddle}
  ${RobotoNormalLicorice16px}
            width: 280px;
  height: 8px;
  letter-spacing: 0.5px;
  line-height: 24px;
  white-space: nowrap;
`;

const Inventory = styled.div`
  display: flex;
  padding: 0 7.5px;
  align-items: flex-start;
  min-width: 868px;
  gap: 50px;
  border: 1px none;
  color: #ffff;
  @media (min-width: 575px) and (max-width: 1025px) {
    min-width: 500px;
    max-width: 70vw;
    margin-inline: auto;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Frame2608168 = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 176px;
  border: 1px none;
  cursor: pointer;
`;

const IconLocationPin = styled.img`
  width: 32px;
  height: 40px;
  align-self: center;
  margin-bottom: 10px;
`;

const OverlapGroup = styled.div`
  width: 128px;
  height: 92px;
  position: relative;
  margin-top: -1px;
`;

const Text1 = styled.h1`
  ${ValignTextMiddle}
  ${RobotoLightMerino50px}
            position: absolute;
  width: 108px;
  height: 60px;
  top: 0;
  left: 0;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const Places = styled.div`
  ${RobotoMediumMerino20px}
  position: absolute;
  width: 91px;
  top: 57px;
  left: 0;
  letter-spacing: 0.5px;
  line-height: 24px;
  white-space: nowrap;
`;

const Frame2608169 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 177px;
  border: 1px none;
  cursor: pointer;
`;

const Vector = styled.img`
  width: 31px;
  height: 34px;
  align-self: center;
  margin-bottom: 20px;
`;

const OverlapGroup1 = styled.div`
  width: 170px;
  height: 92px;
  position: relative;
  margin-top: -1px;
`;

const Text2 = styled.div`
  ${ValignTextMiddle}
  ${RobotoLightMerino50px}
            position: absolute;
  width: 110px;
  height: 60px;
  top: 0;
  left: 0;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const Frame2608170 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 171px;
  border: 1px none;
  cursor: pointer;
`;

const Vector1 = styled.img`
  width: 26px;
  height: 33px;
  align-self: center;
  margin-bottom: 21px;
`;

const OverlapGroup2 = styled.div`
  width: 150px;
  height: 92px;
  position: relative;
  margin-top: -1px;
`;

const Number = styled.div`
  ${ValignTextMiddle}
  ${RobotoLightMerino50px}
            position: absolute;
  width: 101px;
  height: 60px;
  top: 0;
  left: 0;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const LibraryItems = styled.div`
  ${RobotoMediumMerino20px}
  position: absolute;
  width: 150px;
  top: 57px;
  left: 0;
  letter-spacing: 0.5px;
  line-height: 24px;
  white-space: nowrap;
`;

const Frame2608171 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 179px;
  border: 1px none;
  cursor: pointer;
`;

const Vector2 = styled.img`
  width: 33px;
  height: 33px;
  align-self: center;
  margin-bottom: 21px;
`;

const OverlapGroup3 = styled.div`
  width: 138px;
  height: 92px;
  position: relative;
  margin-top: -1px;
`;

const Text3 = styled.div`
  ${ValignTextMiddle}
  ${RobotoLightMerino50px}
            position: absolute;
  width: 110px;
  height: 60px;
  top: 0;
  left: 0;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const MediaItems = styled.div`
  ${RobotoMediumMerino20px}
  position: absolute;
  width: 129px;
  top: 57px;
  left: 0;
  letter-spacing: 0.5px;
  line-height: 24px;
  white-space: nowrap;
`;



export default LandingPage;
