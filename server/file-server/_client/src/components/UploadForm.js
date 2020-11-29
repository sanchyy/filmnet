import { React } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from '../Loading';

class upladeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', movie: null, image: null, uploading: false, showAlert: false, alert: {}};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({title: event.target.value, movie: event.target.files})
    }
    
    showAlert (event) {
        <Alert
            alert={alert}
            onClose={() => this.setState({showAlert: false})}
        />
    }

    async handleSubmit (event) { 
        event.preventDefault();
        this.setState({uploading: true });
        let response = {};

        try {
            const data = new FormData();
            data.append('movie', this.state.movie);
            data.append('title', this.state.title);
            data.append('image', this.state.image);
        }
        catch (err) {
            response = err;
            console.log(err);
        }
        this.setState({ uploading: false, alert: response, showAlert: true });
    }

    render() {
        if (this.state.uploading) {
            return <Loading title="Uploading files..." text="Uploading" />
        }
        return (
        <>
        { this.showAlert(this.state.alert) }
        <Form className="mb-3" onSubmit={(e) => this.onSubmit(e)}>
            <Form.Label> Upload Movie </Form.Label>
            <Form.File
                className="mb-2"
                onChange={(e) => this.onChange(e)}
            />
            <Form.Label> Upload Movie Picture </Form.Label>
            <Form.File
                className="mb-2"
                onChange={(e) => this.onChange(e)}
            />
            <Button variant="primary" type="submit">
                Upload
            </Button>
        </Form>
        </>
        )
    }
}