/*global cloudinary */
import React from "react";
import styled from 'styled-components';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import Page from "../Page";
import SponsorForm from './SponsorForm';
import PremiumSponsors from './PremiumSponsors';
import CommunitySponsors from './CommunitySponsors';

import { AlignCenter, AlignCenterColumn, Heading3, Paragraph, SimpleLink } from '../GlobalStyledComponents/ReversimStyledComps';

library.add(faPencilAlt, faTrash);

// Styled-components Section

  //WantToBe components
const WantToBeContainer = styled.div`
  ${({ theme: { color, space, font } }) =>`
    margin: ${space.xl} 0px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    
    text-align: center;
    line-height: 1.7;
    font-family: ${font.main};
    
    color: ${color.text_1};
  `}
`;

const WantToBePara = styled(Paragraph)`
  ${({ theme: { font } }) => `
    font-weight: ${font.weight_normal};
    font-size: ${font.size_bg};
  `}
`;

const WantToBelink = styled(SimpleLink)`
  ${({ theme: { font } }) => `
    font-size: ${font.size_bg};
  `}
`;

  //SponsorsPage Components

const PremiumSectionContainer = styled.section`
  ${({ theme: { color, space, mq } }) => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-size: contain;
    background-color: ${color.background_2};
    padding: ${space.xl} 180px ${space.xxl} 180px;

    border-top: 100px solid ${color.box_shadow_1};
  `}
`;//NOTE: same weird display under 768px width where 100% is narrower than viewport's width for no reason.

const AddSoponsorContainer = styled.div`
  ${({ theme: { space, color} }) =>`
    width: inherit;
    padding: ${space.l};
    margin-bottom: ${space.xxl};
    border: 2px solid ${color.box_shadow_3};
    color: ${color.text_1};
  `}
`;

const CommunityContainer = styled(AlignCenter)`
 ${({ theme: { space } }) => `
    width: 80%;
    margin-top: ${space.xl};
 `}
`;

const InviterContainer = styled.div`
  ${({ theme: { space, color } }) => `
    box-shadow: inset 0px 0px 10px 2px ${color.font_awsome_box_shadow_3};
    background: ${color.background_linear_gradient_1};
    padding: ${space.xl};
    margin-bottom: ${space.xl};  
  `}
`;

const InviterHeading = styled(Heading3)`
  ${({ theme: { color } }) => `
    color: ${color.heading_2};
    text-align: center;
  `}
`;

const InviterHeadingBold = styled(InviterHeading)`
  ${({ theme: { font }}) => `
    font-weight: ${font.weight_bold};
  `}
`;

// React components section

const WantToBe = () => (
  <WantToBeContainer>
    <Heading3>Want to be a sponsor?</Heading3> 
    <WantToBePara>
      {"Contact our amazing Gilli at "}
      <WantToBelink href="mailto:gilli@reversim.com">
        gilli@reversim.com
      </WantToBelink>
      {" and let's have fun together!"}
    </WantToBePara>
  </WantToBeContainer>
);

class SponsorsPage extends React.Component {
  render() {
    const {
      createSponsor,
      updateSponsor,
      deleteSponsor,
      user,
      sponsors
    } = this.props;

    return (
      <Page title="Sponsors" {...this.props}>
        <PremiumSectionContainer>
          <AlignCenterColumn>
          {
            user && user.isReversimTeamMember && (
              <AddSoponsorContainer>
                <Heading3>Add sponsor</Heading3>
                <SponsorForm onSubmit={createSponsor} />
              </AddSoponsorContainer>
            )
          }
            <WantToBe />
            <PremiumSponsors
              sponsors={sponsors.filter(sponsor => sponsor.isPremium)}
              user={user}
              updateSponsor={updateSponsor}
              deleteSponsor={deleteSponsor}
            />
          </AlignCenterColumn>
        </PremiumSectionContainer>
        <CommunityContainer>
          <CommunitySponsors
            sponsors={sponsors.filter(sponsor => !sponsor.isPremium)}
            user={user}
            updateSponsor={updateSponsor}
            deleteSponsor={deleteSponsor}
          />
          {/* <InviterContainer>
            <InviterHeading>The annual Reversim conference is here</InviterHeading>
            <InviterHeadingBold>and we can't do it without you!</InviterHeadingBold>
          </InviterContainer> */}
        </CommunityContainer>
      </Page>
    );
  }
}

export default SponsorsPage;

// class Sponsor extends React.Component {
//   constructor(props) {
//     super(props);
//     let {
//       sponsor: { about }
//     } = this.props;
//     const isTooLong = about.length > COLLAPSED_MAX_CHARS;
//   }

//   render() {
//     let {
//       sponsor: { name = "", logo, url, about = "", jobUrl },
//       onEdit,
//       onDelete
//     } = this.props;

//     const featuredJob = `Interested? More info [here](${jobUrl}).`;

//     return (
//       <div className="about__team-member mb-12 d-flex" style={{height: "auto"}}>
//         <a href={hyperlink(url)} target="_blank">
//           <div
//             style={{ backgroundImage: `url('${image(logo, 240, 240)}')` }}
//             alt={name}
//             className={img}
//           />
//         </a>
//         <div className="flex-grow-1 line-height-12">
//           <div className="p-4 bg-white b-strong p-relative overflow-hidden">
//             <div ref={this.ref}>
//               <h4 className="line-height-1 mb-1">
//                 {name}
//                 {onEdit && (
//                   <span>
//                     <Button
//                       size="sm"
//                       color="primary"
//                       className="ml-2"
//                       onClick={onEdit}
//                     >
//                       <FontAwesomeIcon icon={faPencilAlt} />
//                     </Button>
//                     <Button
//                       size="sm"
//                       color="danger"
//                       className="ml-2"
//                       onClick={onDelete}
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </Button>
//                   </span>
//                 )}
//               </h4>
//               <p className="line-height-15 mb-0">{about}</p>
//               {jobUrl && (
//                 <div>
//                   <br />
//                   <h5>Featured job</h5>
//                   <ReactMarkdown source={featuredJob} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// NOTE: Sponsor component is not in use but I didn't want to delet it yet