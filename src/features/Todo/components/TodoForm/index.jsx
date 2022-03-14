import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from 'components/form-controls/InputField';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm({ onSubmit }) {
  const schema = yup
    .object()
    .shape({
      title: yup
        .string()
        .required('Please enter title!')
        .min(5, 'Title is too short!'),
    })
    .required('Required all');

  const defaultValues = {
    title: '',
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleTodoSubmit = (values) => {
    if (onSubmit) onSubmit(values);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleTodoSubmit)}>
      <InputField form={form} name="title" label="Todo" />
    </form>
  );
}

export default TodoForm;
