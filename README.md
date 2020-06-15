# jspsych-attn-check
Display an image and a text box, then compare text box response to a string of your choice and get the Levenshtein distance between the two; specify a threshold of percentage correct required for approval. Can be used like any other jsPsych plugin. See [this](test_attn_check.html) HTML file for a sample implementation.

|Parameter|Type|Default Value|Description|
|---|---|---|---|
|stimulus|string|Will randomly display one of 20 different images located in the dedicated attention check image library on the lab server.|The path of the image file to be displayed.|
|stimulus_height|integer|null|Set the height of the image in pixels. If left null (no value specified), then the image will display at its natural height.|
|stimulus_width|integer|null|Set the width of the image in pixels. If left null (no value specified), then the image will display at its natural width.|
|maintain_aspect_ratio|boolean|true|If setting only the width or only the height and this parameter is true, then the other dimension will be scaled to maintain the image's aspect ratio.|
|preamble|string|"Please transcribe (copy) the text in the image below into the input field. Only transcribe the **second and fourth sentences**. Add an exclamation point at the end of the **second sentence you have typed** instead of the question mark. Be exact and make sure to get all characters and spaces correct. We just need to make sure you're paying attention and speak English."|This string can contain HTML markup. Any content here will be displayed above the stimulus. The intention is that it can be used to provide instructions about the action the subject is supposed to take.|
|required|boolean|true|If true, then the user must enter a response to submit.|
|rows|integer|5|The number of rows for the response text box.|
|columns|integer|40|The number of columns for the response text box.|
|button_label|string|'Continue'|The text that appears on the button to finish the trial.|
|compare_to|string|The corresponding correct response for the randomly-selected default image that is presented.|The text string that the participant response is compared to.|
|threshold|integer|95|The threshold for the Levenshtein distance required to pass approval for the attention check - indicate the *minimum percentage correct required for approval*.|

Data recorded by this plugin:
- rt
- stimulus 
- response (response provided by participant, in a JSON object)
- distance (Levenshtein distance between participant response and correct response)
- percent_correct
- percent_required (the threshold percentage)
- compare_to (the correct response that the participant response was compared to)
- approved (whether the Levenshtein distance percentage correct was equal to or above the threshold you specified)
- trial_type
- trial_index
- time_elapsed
- internal_node_id
