import { useState, useCallback } from 'react';

const useForm = ({ initialState, onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  }, []);

  const hendleSubmit = e => {
    e.preventDefault();
    onSubmit(state.search);
    setState({ ...initialState });
  };

  return { state, setState, handleChange, hendleSubmit };
};

export default useForm;
