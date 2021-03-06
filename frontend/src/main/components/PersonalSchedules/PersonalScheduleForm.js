import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SingleQuarterDropdown from '../Quarters/SingleQuarterDropdown';
import { quarterRange } from 'main/utils/quarterUtilities';



function PersonalScheduleForm({ initialPersonalSchedule, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialPersonalSchedule || {}, }
    );
    // Stryker enable all

    const navigate = useNavigate();
    const [quarter, setQuarter] = useState({
        quarters: quarterRange("20081", "20213")
    }.quarters[0]);

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialPersonalSchedule && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="PersonalScheduleForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialPersonalSchedule.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    data-testid="PersonalScheduleForm-name"
                    id="name"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("name", {
                        required: "Name is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    data-testid="PersonalScheduleForm-description"
                    id="description"
                    type="text"
                    isInvalid={Boolean(errors.description)}
                    {...register("description", {
                        required: "Description is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" data-testid="PersonalScheduleForm-quarter">
                
                <SingleQuarterDropdown
                    quarter={quarter}
                    setQuarter={setQuarter} 
                    controlId={"PersonalScheduleForm-quarter"}
                    label={"Quarter"}
                    quarters={quarterRange("20081", "20224") }/>
            </Form.Group>


            <Button
                type="submit"
                data-testid="PersonalScheduleForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="PersonalScheduleForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default PersonalScheduleForm;