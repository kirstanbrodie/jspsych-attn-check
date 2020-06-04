# jspsych-attn-check
Display an image and a text box, then compare text box response to a string of your choice and get the Levenshtein distance between the two; specify a threshold of percentage correct required for approval

|Parameter|Type|Default Value|Description|
|---|---|---|---|
|stimulus|string|*undefined*|The path of the image file to be displayed.|
|stimulus_height|integer|null|Set the height of the image in pixels. If left null (no value specified), then the image will display at its natural height.|
|stimulus_width|integer|null|Set the width of the image in pixels. If left null (no value specified), then the image will display at its natural width.|
|maintain_aspect_ratio|boolean|true|If setting only the width or only the height and this parameter is true, then the other dimension will be scaled to maintain the image's aspect ratio.|
|preamble|string|null|This string can contain HTML markup. Any content here will be displayed above the stimulus. The intention is that it can be used to provide instructions about the action the subject is supposed to take (e.g., transcribe the text in the image).|
|required|boolean|true|If true, then the user must enter a response to submit.|
|rows|integer|5|The number of rows for the response text box.|
|columns|integer|40|The number of columns for the response text box.|
|button_label|string|'Continue'|The text that appears on the button to finish the trial.|
|compare_to|string|'Comparison text'|The text string that the participant response is compared to.|
|threshold|integer|90|The threshold for the Levenshtein distance required to pass approval for the attention check - indicate the *minimum percentage correct required for approval*.|
