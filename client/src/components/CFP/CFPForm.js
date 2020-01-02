import React, {Component} from 'react';
import styled from 'styled-components';
import ga from 'react-ga';
import {getUserData} from './UserForm.js';
import {ABSTRACT_MAX, ABSTRACT_MIN, CFP_ENDS_STR} from '../../data/proposals';

import StepZilla from 'react-stepzilla';
import PublicInfo from './CFPForm/PublicInfo';
import ShortBio from './CFPForm/ShortBio';
import PrivateInfo from './CFPForm/PrivateInfo';
import SessionProposal from './CFPForm/SessionProposal';
import Abstract from './CFPForm/Abstract';
import Outline from './CFPForm/Outline';

import {
  AlignCenterColumn,
  HeadingAligner,
  Heading2,
  BreakLineMain,
  Paragraph2,
} from '../GlobalStyledComponents/ReversimStyledComps';

import './prog-track.scss';

//styled-components section
const NoteContainer = styled.div`
  width: 100%;
`;

const DeadLine = styled.span`
  ${({ theme: { color } }) => `
    color: ${color.important};
  `};
`;

//React components section
class CFPForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missingCategories: false,
      email: '',
      proposal: [], /*NOTE: a promise is generated by this.handleSubmit() for each proposal sent, look for `result = await createProposal` */
      twitter: '',
      gitHub: '',
      linkedin: '',
      trackRecord: '',
      phone: '',
      bio: '',
      oneLiner: '',
      name: '',
      video_url: '',

      abstract: '',
      tags: '',
      categories: '',
      type: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getProposalData = this.getProposalData.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    const formElements = e.target.element;
    /* NOTE: this.handleSubmit() is dependent on formElements. 
       Assgin it a value corresponding to this.state and make sure it's keys are called accordingly */
    const {abstract, categories} = this.state;
    const {user, updateUserData, createProposal, history} = this.props;

    if (user) {
      if (abstract.length > ABSTRACT_MAX || abstract.length < ABSTRACT_MIN) {
        const scrollY =
          formElements.abstract.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          150;
        window.scrollTo(0, scrollY);
        formElements.abstract.focus();
        return;
      } /* NOTE: Scroll to Abstract if abstract.length is bigger than Max or smaller than Min*/

      if (!categories.length) {
        this.setState({missingCategories: true});
        const scrollY =
          formElements.categories_hidden.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          750;
        window.scrollTo(0, scrollY);
        return;
      } /* NOTE: Scroll to Categories if there's no abstract.categories.length*/

      try {
        let newUser = getUserData(e.target.elements); /* NOTE: creates a newUser object with info passed from the form */
        newUser._id = user._id;
        await updateUserData(newUser);
        /*NOTE: the above puts the newUser obj to the '/api/user' URL. updateUserData is a prop passed by App.js which
        imports updateUser(user) from /client/src/data-service.js */

        const result = await createProposal(this.getProposalData(this.state));
        /*NOTE: createProposal POSTs the object returned by this.getProposalData(formElements) to /api/proposal
          NOTE: the returned promise is assinged to const result */

        history.push(`/session/${result._id}`); /* NOTE: redirects to the new session's page */
      } catch (ex) {
        ga.exception({
          description: `Error on submit: ${ex}`,
          fatal: true,
        });
      }
    }
  };
  /* NOTE: handleSubmit was (and maybe should be) passed to a <form onSubmit={this.handleSubmit}> that wrapps <StepZilla />
     NOTE: Done what I suggested above but it doesn't work. still formElements is not defined */

  getProposalData = formElements => {
    const title = formElements.title.value;
    const type = this.state.sessionProposal.type;
    const outline = formElements.outline.value;
    const abstract = formElements.abstract.value;
    const legal = formElements.legal.checked;
    const tags = this.state.abstract.tags;
    const categories = this.state.abstract.categories;
    const user = this.props.user;
    const coSpeaker = formElements.coSpeaker.value;

    return {
      title,
      type,
      abstract,
      outline,
      tags,
      categories,
      legal,
      speaker_ids: [user._id],
      coSpeaker,
    }
  };
// NOTE: getProposalData is passed to handleSubmit

  updateState = state => this.setState(state);

  render() {
    const {user, allTags} = this.props;
    const { tags, categories, type } = this.state;

    const steps = [
      {
        name: 'Public Info',
        component: <PublicInfo user={user} />
      },
      {
        name: 'Short Bio',
        component: <ShortBio user={user} />
      },
      {
        name: 'Private Info',
        component: <PrivateInfo user={user} />
      },
      {
        name: 'Session Proposal',
        component: (
          <SessionProposal
            update={this.updateState}
            tags={tags}
            type={type}
            categories={categories}
            missingCategories={this.state.missingCategories}
            allTags={allTags}
          />
        )
      },
      {
        name: 'Abstract',
        component: (
          <Abstract
            update={this.updateState}
            tags={tags}
            type={type}
            categories={categories}
            missingCategories={this.state.missingCategories}
            allTags={allTags}
          />
        )
      },
      {
        name: 'Outline & Notes',
        component: (
          <Outline
            user={user}
            updateUserData={this.props.updateUserData}
            createProposal={this.props.createProposal}
            history={this.props.history}
          />
        )
      },
    ];

    return (
      <AlignCenterColumn>
        <HeadingAligner>
          <Heading2>Submission</Heading2>
          <BreakLineMain />
        </HeadingAligner>
        <NoteContainer>
          <Paragraph2>Dear {user.name}, happy to see you're submitting session proposals! :)</Paragraph2>
          <Paragraph2>Remember, you may submit up to 3 proposals.</Paragraph2>
          <Paragraph2>Call for paper ends: <DeadLine>{CFP_ENDS_STR}</DeadLine>. No kidding.</Paragraph2>
        </NoteContainer>
        <div className='step-progress pl-5 pr-7'>
          <form onSubmit={this.handleSubmit}>
            <StepZilla
              preventEnterSubmission={true}
              steps={steps}
            />
          </form>
        </div>
      </AlignCenterColumn>
    );
  }
}

export default CFPForm;
