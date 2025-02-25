import React from 'react'
import ReactDOM from 'react-dom'

class Proposal extends React.Component {
    constructor(props) {
        super(props);
        this.proposal = props.proposal;
        this.showEditButton = props.showEditButton;
    }
    render() {
        return <div className="card" style={{ margin: 30 + "px" }}>
            <div className="card-header">
                <h5 className="card-title"> {this.proposal.country}, {this.proposal.city} </h5>
                <h6 className="card-subtitle mb-2 text-muted"> {this.proposal.date} </h6>
            </div>
            <div className="card-body">
                <p className="card-text">
                    <span className="display-linebreak">
                        {this.proposal.description}
                    </span>
                </p>
                {this.proposal.url &&
                    <a href={"//" + this.proposal.url} className="cardLink">Додаткова інформація</a>
                }
                <hr />
                Contact / Контакт: <br />
                <p className="card-text">
                    <b> {this.proposal.full_name}</b>
                    <br />
                    <span className="display-linebreak">
                        {this.proposal.contact}
                    </span>
                </p>
                {this.showEditButton &&
                    <a href={"aid_proposals/" + this.proposal.id + "/edit"} className="cardLink"> Update / Оновити</a>
                }
            </div>
        </div>
    }
}

class ProposalsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { proposals: JSON.parse(props.proposals) };
    }

    render() {
        return (
            <div>
                {this.state.proposals.map(proposal => <Proposal proposal={proposal} key={proposal.id} showEditButton={this.props.userEmail == proposal.user_email} />)}
            </div>
        );
    }
}

class SearchField extends React.Component {
    render() {
        return (
            <input id={this.props.field} className="form-control" placeholder="Search / Пошук" onChange={this.input.bind(this)} type="text" />
        );
    }

    input(event) {
        const url = this.props.action + "?" + this.props.field + "=" + encodeURIComponent(event.target.value);
        fetch(url).then((response) => response.json()).then(result => this.updateProposals(result));
    }

    updateProposals(proposals) {
        this.props.proposalList.setState({ proposals: proposals });
    }
}


export function InitAidProposalsSearch() {
    const proposalsEl = document.body.querySelector(".proposals-container");
    if (proposalsEl === null)
        return;

    const proposalList = ReactDOM.render(
        <ProposalsList proposals={proposalsEl.dataset.proposals} userEmail={proposalsEl.dataset.userEmail} />,
        proposalsEl,
    )

    const searchEl = document.body.querySelector(".search-field-container");
    ReactDOM.render(
        <SearchField proposalList={proposalList} action={searchEl.dataset.action} field={searchEl.dataset.field} />,
        searchEl
    );
}

