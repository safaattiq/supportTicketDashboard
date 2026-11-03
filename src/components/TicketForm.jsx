import { useEffect, useRef, useState } from "react";
import { PRIORITIES, CATEGORIES, PRIORITY_LABELS } from "../constants";

function validate(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.description.trim()) errors.description = "Description is required.";
  if (!values.priority) errors.priority = "Please select a priority.";
  return errors;
}

// The form owns its field values (local state). When the data is valid it
// hands it to the parent with onSubmit (child -> parent).
function TicketForm({ onSubmit, submitting, submitError }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
    category: CATEGORIES[0],
    priority: "",
  });
  const [errors, setErrors] = useState({});

  // A ref holds a reference to the real DOM input. Changing it does not
  // cause a re-render, which is what we want for focusing an element.
  const titleRef = useRef(null);

  // Runs once after the first render, when the input exists in the DOM.
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const foundErrors = validate(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      priority: values.priority,
    });
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit} noValidate>
      <label>
        Title
        <input
          ref={titleRef}
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </label>

      <label>
        Description
        <textarea
          name="description"
          rows="4"
          value={values.description}
          onChange={handleChange}
        />
        {errors.description && (
          <span className="field-error">{errors.description}</span>
        )}
      </label>

      <label>
        Category
        <select name="category" value={values.category} onChange={handleChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Priority
        <select name="priority" value={values.priority} onChange={handleChange}>
          <option value="">Select priority</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>
        {errors.priority && <span className="field-error">{errors.priority}</span>}
      </label>

      {submitError && <p className="field-error">{submitError}</p>}

      <button className="primary" type="submit" disabled={submitting}>
        {submitting ? "Creating..." : "Create Ticket"}
      </button>
    </form>
  );
}

export default TicketForm;
