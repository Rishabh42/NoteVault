## Requirements Template

_Customize the structure of your requirements document to fit your needs and minimize clutter and useless boilerplate text. However, include at least the following elements, prominently labeled:_

* **System Purpose and Scope:** 
  We intend to design a privacy oriented note taking application focusing on the _KISS_ principle. Our inspiration was the old school way of taking notes in a paper notebook. We wanted to design an app that does just that and nothing else unlike a host of other note taking apps available today. Most of these other apps have intrusive motivations behind their design. Either they are ingesting user's data for training their LLMs, profiling users across different products of the same ecosystem or tracking the user's behaviour through the content of their notes. Though, we concede that these alternatives provide multiple additional features such as text completion and grammar check but it comes at the cost of privacy and simplicity. The need to design such an app arised from the lack of alternatives which promise to keep our data private and provide enough functionality to simply make a note.

  **System description:**
  We will design a web app based note taking system where users will not be expected to divulge personally identifiable information for logging in to the app. We do not want to mine the user's content nor store at a central server. We want the user data to be encrypted and spread out over different devices so that there is no central point of failure. Since the data will be encrypted, we postulate that storing it in a distributed manner will not be an issue rather it will add to the security of the content. The app will store only text data and we will not allow external third party extensions to interface with the app.

* **Sample Systems:** Briefly describe and refer to the home page of systems in the same class. Presumably these would be systems that are _not_ implemented following the principles of Privacy by Design. Envision this section as a kind of comparison between your future system and the existing "competition" (see [the Threema docs](https://threema.ch/en/messenger-comparison) for an example of what this can look like).

* **Functional Requirements:** List, using a structured format (e.g., enumerated lists organized by section) the main functional requirements your system will support. Include in this list any required system or user interface requirements.

* **Privacy Requirements:** List, using a structured format (e.g., enumerated lists organized by section) the main privacy requirements your system will support. 

* **Privacy by Design:** Explain how your system will realize the principles of privacy by design.

### References
- [requirements document](https://doi.org/10.1109/IEEESTD.2018.8559686)
- 