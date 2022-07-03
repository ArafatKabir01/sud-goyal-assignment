import React, { useEffect, useState } from 'react';

const FormControl = () => {

    const [users, setUsers] = useState([]);
    const [httpResult, setHttpResult] = useState('');
    const [formData, setFormData] = useState({
        title: '', body: '', userId: ''
    });
    const [errors, setError] = useState({
        title: '', body: '', userId: ''
    });

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    })


    const handleSubmit = e => {
        e.preventDefault();

        if (formData.title === '' && formData.body === '' && formData.userId === '') {
            setError({ ...errors, title: 'Title field is required.', body: 'Body field is required.', userId: 'Please select a user!' })
        } else if (formData.title === '' && formData.body === '') {
            setError({ ...errors, title: 'Title field is required.', body: 'Body field is required.', userId: '' })
        } else if (formData.title === '' && formData.userId === '') {
            setError({ ...errors, title: 'Title field is required.', body: '', userId: 'Please select a user!' })
        } else if (formData.body === '' && formData.userId === '') {
            setError({ ...errors, title: '', body: 'Body field is required.', userId: 'Please select a user!' })
        } else if (formData.title === '') {
            setError({ ...errors, title: 'Title field is required.', body: '', userId: '' })
        } else if (formData.body === '') {
            setError({ ...errors, title: '', body: 'Body field is required.', userId: '' })
        } else if (formData.userId === '') {
            setError({ ...errors, title: '', body: '', userId: 'Please select a user!' })
        } else {
            setError({ title: '', body: '', userId: '' });

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.id) {
                        setHttpResult('Post successfully submitted!');
                    } else {
                        setHttpResult('There is problem!');
                    }
                    setFormData({ title: '', body: '', userId: '' });
                })
        }
    }

    return (
        <div className='container w-50' data-testid="form-1">
            <form onSubmit={handleSubmit}>

                {
                    httpResult && <center><h4>{httpResult}</h4></center>
                }

                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="title"
                    value={formData?.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                {
                    errors.title && <p className='red'>{errors.title}</p>
                }

                <label htmlFor="body">Body</label>
                <input type="text" id="body" name="body" placeholder="body"
                    value={formData?.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })} />
                {
                    errors.body && <p className='red'>{errors.body}</p>
                }

                <label htmlFor="userId">User</label>
                <select id="userId" name="userId" onChange={(e) => setFormData({ ...formData, userId: e.target.value })}>
                    <option value="" selected={formData.userId === ''}>Select User</option>
                    {
                        users?.map(user => <option value={user.id} key={user.id}>{user.name}</option>)
                    }
                </select>
                {
                    errors.userId && <p className='red'>{errors.userId}</p>
                }


                <input type="submit" value="Submit" />

            </form>
        </div>
    );
};

export default FormControl;