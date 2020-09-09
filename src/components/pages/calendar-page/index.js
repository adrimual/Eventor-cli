import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Calendar from "./calendar"



import EventService from "../../../services/EventService"

import SpinnerContainer from "../../ui/Spinner"

import "./calendar-page.css"

class CalendarPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
        }
        this.eventService = new EventService()

    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.updateEvents()
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.events !== prevState.events) {
            this.render()
        }
    }
    updateEvents = () => {
        if (this.props.match.params.userId) {
            this.getAllUserEvents(this.props.match.params.userId)
        }
    }

    getAllUserEvents = id => {
        this.eventService.getAllEventsUser(id)
            .then(response => {
                this.setState({ events: response.data })
            })
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    render() {
        return (
            <>
                {(this.state.events) ?
                    <Container fluid as="main">
                        <Row >
                            <Col className='calendar' md={{ span: 10 }}>
                                <Calendar events={this.state.events} loggedInUser={this.props.loggedInUser} handleToast={this.props.handleToast} updateEvents={this.updateEvents} {...this.props} />
                            </Col>
                        </Row>

                    </Container> : <SpinnerContainer />
                }
            </>
        )
    }
}

export default CalendarPage