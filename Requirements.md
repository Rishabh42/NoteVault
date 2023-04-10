# Requirements

## **System Purpose and Scope:** 
  We intend to design a privacy oriented note taking application focusing on the _KISS_ principle [^KIS]. Our inspiration was the old school way of taking notes in a paper notebook. We wanted to design an app that does just that and nothing else unlike a host of other note taking apps available today. Most of these other apps have intrusive motivations behind their design [^mob]. Either they are ingesting user's data for training their LLMs, profiling users across different products of the same ecosystem or tracking the user's behaviour through the content of their notes. Though, we concede that these alternatives provide multiple additional features such as text completion and grammar check but it comes at the cost of privacy and simplicity. The need to design such an app arised from the lack of alternatives which promise to keep our data private and provide enough functionality to simply make a note.

[^KIS]: Interaction Design Foundation. (2023, April 9). Kiss (keep it simple, stupid) - a design principle. The Interaction Design Foundation. Retrieved April 9, 2023, from https://www.interaction-design.org/literature/article/kiss-keep-it-simple-stupid-a-design-principle 

[^mob]: Almuhimedi, H., Schaub, F., Sadeh, N., Adjerid, I., Acquisti, A., Gluck, J., Cranor, L. F., &amp; Agarwal, Y. (2015). Your location has been shared 5,398 times! Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems. https://doi.org/10.1145/2702123.2702210 

##  **System description:**
  We will design a web app based note taking system where users will not be expected to divulge personally identifiable information for logging in to the app. We do not want to mine the user's content nor store at a central server. We want the user data to be encrypted and spread out over different devices so that there is no central point of failure. Since the data will be encrypted, we postulate that storing it in a distributed manner will not be an issue rather it will add to the security of the content. The app will store only text data and we will not allow external third party extensions to interface with the app.

## **Sample Systems:** [^ever] [^keep] [^one] [^notion] [^saferoom] [^everEncryp] [^everSec] [^googkeep] [^notionSubProcess] [^notionPrivacy]

[^ever]: Best note taking app - organize your notes with Evernote. Evernote. (n.d.). Retrieved March 21, 2023, from https://evernote.com/ 
[^keep]: Google. (n.d.). Meet Google Keep – Save Your Thoughts, wherever you are. Google Keep: Free Note Taking App for Personal Use. Retrieved April 9, 2023, from https://www.google.com/keep/ 
[^one]: Microsoft OneNote. (n.d.). Retrieved April 9, 2023, from https://www.onenote.com/?public=1 
[^notion]: Your wiki, docs &amp; projects. together. Notion. (n.d.). Retrieved March 30, 2023, from https://www.notion.so/product 
[^saferoom]: Encrypt your data. Saferoom. (n.d.). Retrieved April 9, 2023, from https://www.getsaferoom.com/ 
[^everEncryp]: What type of encryption does evernote use? - evernote help &amp; learning. (n.d.). Retrieved March 20, 2023, from https://help.evernote.com/hc/en-us/articles/208314128-What-type-of-encryption-does-Evernote-use- 
[^everSec]: Security overview. Evernote. (n.d.). Retrieved March 31, 2023, from https://evernote.com/security 
[^googkeep]: Google. (n.d.). How keep protects your privacy &amp; keeps you in control. Google Keep Help. Retrieved 2023, from https://support.google.com/keep/answer/10431250?hl=en#:~:text=Keep%20uses%20data%20to%20improve%20your%20experience 
[^notionSubProcess]: The all-in-one workspace for your notes, tasks, wikis, and databases. Notion. (n.d.). Retrieved April 9, 2023, from https://www.notion.so/Notion-s-List-of-Subprocessors-268fa5bcfa0f46b6bc29436b21676734 
[^notionPrivacy]: Security &amp; Privacy – Notion Help Center. Notion. (n.d.). Retrieved March 31, 2023, from https://www.notion.so/help/security-and-privacy 

<table>
  <tr>
   <td>System/ Application
   </td>
   <td><strong>Our app</strong>
   </td>
   <td>Evernote <a href="https://evernote.com/">https://evernote.com/</a>
   </td>
   <td>Google Keep <a href="https://www.google.com/keep/">https://www.google.com/keep/</a>
   </td>
   <td>OneNote <a href="https://www.onenote.com/?public=1">https://www.onenote.com/?public=1</a>
   </td>
   <td>Notion <a href="https://www.notion.so/product">https://www.notion.so/product</a>
   </td>
   <td>Saferoom <a href="https://www.getsaferoom.com/">https://www.getsaferoom.com/</a>
<p>
   </td>
  </tr>
  <tr>
   <td>Brief Description
   </td>
   <td>Keeps things simple. No extra fluff with a deep focus on privacy.
   </td>
   <td>
In addition to note taking offers sync and organize, web clipper and calendar.
<p>
Subscription model: Different tiers offered to users based on payment plan selected.
   </td>
   <td>Flagship free note taking offering by Google.
<p>
Add notes, lists, reminders, photos and audio to keep.
<p>

   </td>
   <td>Flagship free note taking offering by Microsoft.
<p>

   </td>
   <td>Offers a really good set of features but it is closed source.
<p>

<a href="https://www.notion.so/Privacy-Policy-3468d120cf614d4c9014c09f6adc9091">Privacy policy</a>
<a href="https://www.notion.so/Terms-and-Privacy-28ffdd083dc3473e9c2da6ec011b58ac">Terms and privacy</a>
   </td>
   <td>Homepage
It is an encryption extension to Evernote and OneNote.
<p>
It is a client side application which can function as an add on to Evernote or OneNote.
<p>
The premise being, saferoom encrypts your notes before they are uploaded to servers of whichever note taking service you are using such as EverNote or OneNote.
<p>
<em>“Once encrypted by Saferoom, the note is uploaded to Evernote or OneNote Cloud. The encrypted content will be treated as Evernote or OneNote note but no one could read or scan it.”</em>
<p>
   </td>
  </tr>
  <tr>
   <td>Privacy by Design - anonymous usability
   </td>
   <td>Yes, no need to provide identifying user information for logging in.
   </td>
   <td>No, you have to provide email to create a profile which is then linked to your devices.
   </td>
   <td>Your google account is used for logging in. Tracked across the whole google ecosystem.
   </td>
   <td>Your outlook email is needed to log in. Tracked across the o365 ecosystem.
   </td>
   <td>Need to create an account to use the app.
   </td>
   <td>You need to configure your master key and add an Evernote or OneNote account.
   </td>
  </tr>
  <tr>
   <td>Notes are encrypted
   </td>
   <td>Yes, notes are encrypted. We do not have access to the content of the user's notes.
   </td>
   <td>You can select text to encrypt. Unclear if all notes are encrypted by default at rest.  AES-128 bit algorithm used.
<p>
<a href="https://help.evernote.com/hc/en-us/articles/208314128-What-type-of-encryption-does-Evernote-use">What type of encryption does evernote use?</a>
   </td>
   <td>It is not totally encrypted since they can access the notes you make to offer you better services.
<p>
But the files you upload with the notes are encrypted in transit and at rest.
   </td>
   <td>All notes are not end to end encrypted by default.
<p>
You can password protect certain sections of notebooks which would be secured by AES 128-bit.
<p>
<a href="https://support.microsoft.com/en-us/office/protect-notes-with-a-password-in-microsoft-onenote-280af2bf-0959-4889-9191-e326b2bbedee#:~:text=OneNote%20uses%20128%2Dbit%20AES%20encryption%20to%20secure%20password%2Dprotected%20notebook%20sections">source</a>.
   </td>
   <td>Yes, notes are encrypted at rest and in transit.
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>No mining of user’s content for any purpose
<p>
(write and forget principle)
   </td>
   <td>We do not run any sort of content indexing on the data contained within the user's notes. 
   </td>
   <td>Evernote retains your content unless you take explicit steps to delete notes and/or notebooks.
<p>
<a href="https://evernote.com/security">data retention and deletion</a>
<p>
From their privacy policy, we found they collect basic subscriber data, usage data, location and device information.
<p>
<a href="https://evernote.com/privacy/policy">source</a>
   </td>
   <td>Keep uses data to improve your experience
<p>
<a href="https://support.google.com/keep/answer/10431250?hl=en#:~:text=Keep%20uses%20data%20to%20improve%20your%20experience">Data used to improve experience</a>
   </td>
   <td>Data used to improve experience.
   </td>
   <td>Analytics and logging enabled. Services of subprocessors utilized.
<p>
<a href="https://www.notion.so/Notion-s-List-of-Subprocessors-268fa5bcfa0f46b6bc29436b21676734">Notion’s list of subprocessors</a>
<p>
Source - <a href="https://www.notion.so/help/security-and-privacy">Notion: security and privacy</a>
   </td>
   <td>Since, they don’t host any data directly, this point is not applicable to this app.
   </td>
  </tr>
  <tr>
   <td>Opensource
   </td>
   <td>Yes, we will release the code after course completion with permission. (of course!)
   </td>
   <td>It is not open source.
   </td>
   <td>It is not open source.
   </td>
   <td>It is not open source.
   </td>
   <td>It is not open source.
   </td>
   <td>Yes.
<p>
<a href="https://github.com/saferoom-app/saferoomlinux">https://github.com/saferoom-app/saferoomlinux</a>
   </td>
  </tr>
  <tr>
   <td>User profiling
   </td>
   <td>No, collection or linkage of user data with identities of users.
   </td>
   <td>Yes.
<p>
Quoting from their privacy policy under section on how they use the collected information.
<p>
Suggesting actions for you to take based on information you’ve stored.
<p>
<a href="https://evernote.com/privacy/policy#:~:text=Suggesting%20actions%20for%20you%20to%20take%20based%20on%20information%20you%E2%80%99ve%20stored">Evernote privacy policy</a>.
   </td>
   <td>Keep is linked to your google profile
   </td>
   <td>OneNote is linked to our outlook profile.
   </td>
   <td>They can use any content stored with them in any way they deem applicable after de-identifying and aggregating information. They mention that once de-identified and aggregated, the data is no longer subject to terms of privacy policy and they <em>“may use and disclose such information in a number of ways, including research, internal analysis, analytics, and any other legally permissible purposes.”</em>
<p>
<a href="https://www.notion.so/Privacy-Policy-3468d120cf614d4c9014c09f6adc9091#807ffef41d75415aa00376b297fed8b8">source section 2 of the privacy policy</a>
   </td>
   <td>Since, they don’t host any data directly, this point is not applicable to this app.
<p>
But since they can read whole data before encrypting, it comes down to users placing the trust in the app to not mine and use the content data of their notes.
   </td>
  </tr>
  <tr>
   <td>Web3 compatible
   </td>
   <td>Yes
   </td>
   <td>No, blockchain interface.
   </td>
   <td>No, blockchain interface.
   </td>
   <td>No, blockchain interface.
   </td>
   <td>No, blockchain interface.
   </td>
   <td>No, blockchain interface.
   </td>
  </tr>
</table>


## **Functional Requirements:** [^req] [^funReq]

1. The system shall allow the users to access the notes without requiring the divulgence of users' PII such as name, date of birth or Email addresses.
2. Users must be able to login to the application without a steep learning curve to understand the new way of sign-in process without requiring password and email identifiers. (The login process should be intuitive and self-explanatory.)
3. The login module must be compatible with web3.
4. The system should maintain clarity and transparency with respect to each action offered to the user (from the privacy context). Further, the locus of control should be from the user's point of view and there shall not be blackbox components in the system where the user is not mentally aware of what is happening with their data.
5. _System requirements_
      - This is a web app so it shall be supported in the commonly used modern browsers.
      - It shall work on systems with minimal requirements. To be specific, it requires at least 512MB of RAM and 50 MB of disk space for cache in the worst case. 
6. _User interface requirements_
      - It should be rendered in most of the common resolutions (720p and full HD) and monitors found in modern day computing devices.
      - It is not intended to be a touch supported application. The main method of control would be through mouse and keyboard found in most of the modern day laptops and computers.
7. _In-app functionalities_
      - The user shall be able to create notes associated with his/her private meta-mask (string of random characters which allows a user to login and access their data).
      - The user shall be able to modify and delete notes which he/she owns.
      - No user shall be able to access any notes or content data without providing the private metamask string. (see description above)
      - The user shall not be required to remember and keep track of private meta-mask string. The client side functionality must assist the user in keeping track of meta-mask and taking the burden off the user while also ensuring the private string is not visible to anyone else apart from the user.
      - The notes which the user creates shall only consist of text. There will be no additional file allowed to be stored in the notes either directly or as an attachment.
      - The notes which the user creates shall offer markdown support.
      - There should be a logging out functionality which will close the session associated with the private meta-mask string associated with the user.
8. _Data management_: This section will cover the requirements for protection and retention of notes data which the user creates. Also, it will explain the storage of the content and the two modes offered in our app.
      - The system shall offer end to end encryption. The notes created by the user must be encrypted at client end itself. The app must not be able to make sense of the user's notes once they leave the client’s device. Also, the keys for decrypting the notes should be decoupled from the storage location of the encrypted notes.
      - By default, the data should be retained for 12 months from the date it is created. If there is no activity by the user for those notes for a period of 12 months, then those notes will become eligible for deletion. If the user modifies those notes during this period then the 12 month counter will be revised from the modification time else after 12 months the user will get an expiry alert for those notes, after which they will be deleted.
      - The app must offer two storage modes whereby the user can choose to keep their data on the server outside their machine or they can keep all their data on their own machine. In case, the user switches from server mode to local mode, all the data stored so far in the server should be copied to local machine of the user and then deleted from the server.

[^req]: "ISO/IEC/IEEE International Standard - Systems and software engineering -- Life cycle processes -- Requirements engineering," in ISO/IEC/IEEE 29148:2018(E) , vol., no., pp.1-104, 30 Nov. 2018, doi: 10.1109/IEEESTD.2018.8559686.
[^funReq]: Malan, R., & Bredemeyer, D. (2001). Functional requirements and use cases. Bredemeyer Consulting.

## **Privacy Requirements:** [^priReq] [^priR] [^priReqEng]

1. _User data collection_
   - The system must not collect user data to be stored in an unencrypted manner. There must not be any scenario where the system’s backend can make sense of the actual content contained in the user’s notes. By design, once the notes are saved by the user, they should be encrypted at the client’s end before leaving the user's machine for the server.
   - Notes should be visible and understood by only the user who created those.
   - The system shall not collect any personal information from the user for the purposes of identification and create a record in the database. There must not be any linkage between the identity of the user, the usage patterns on the app and the content user creates (or) modifies.
2. _User data storage_
   - All the data created by the user shall be stored in an encrypted format. Unencrypted data from users shall only be handled on the client’s device. There must not be any access provided to third party extensions to data stored in the system.
   - In the local mode of usage, the app should not keep any data on the server and if previously the server mode was being used then the data from the server should be moved to the local client storage before being deleted on the server.
3. _User data retention_
   - By default the retention period of user data is set at 12 months based on the creation and modification time after which the data will automatically be deleted.
4. _Data protection_
   - The encryption key for the notes should not be stored along with the encrypted data at the server. Further, the user must not be expected to keep track of their encryption key.
   - Users shall make sure that their password to utilize metamask remains secure. They will not be expected to keep track of other keys or strings nor will they need to provide any other personal information to establish their profile for keeping track of data associated with their account.
5. _User profiling_
   - The system must not establish linkages between the content of the user’s notes and the details they provide to login the to app. Since the only requirement from the user to establish authenticity for logging in is the private metamask key, the system must not correlate the details contained within the notes to the key. 
6. _Data Mining_
   - Since the data stored at servers is encrypted, thus the system must not be in a position to try to uncover patterns in the stored user data.
7. _Compliance_
   - At the client end, while the user is working with their notes, the system must not scan or index the content being worked upon. After saving the notes, the data must be encrypted. By design, at no point must the system be able to be aware of the content contained in the notes. This means that the system shall not be able to filter or block any specific content because it is not aware of the existence of such content. From a compliance perspective,  the age of users using the app shall be restricted by including a self-declaration check box from users when they try to use our web app.
   - The application shall comply with the gdpr processing standards both in the local and server storage mode.
8. _Transparency and clarity_
   - The users shall be aware of the implications of their actions from a privacy point of view, on the application at each step. The interface must be kept straightforward and simple so that actions may be described in a complete manner.
   - The application shall be upfront about the storage location and encryption standards of the user’s notes.
9. _Accountability_
   - The application must have a dedicated grievance redressal system through issues on gitlab where anyone can post the issues they have seen in the app without revealing their meta mask.
   - There shall be an email address (associated to a designated privacy protection officer for the app) where concerns can be sent if the users are comfortable enough to reach out over email.

[^priReq]: Anthonysamy, P., Rashid, A., & Chitchyan, R. (2017, May). Privacy requirements: present & future. In 2017 IEEE/ACM 39th international conference on software engineering: software engineering in society track (ICSE-SEIS) (pp. 13-22). IEEE.

[^priR]: Kalloniatis, C., Kavakli, E., & Gritzalis, S. (2008). Addressing privacy requirements in system design: the PriS method. Requirements Engineering, 13, 241-255.

[^priReqEng]: Deng, M., Wuyts, K., Scandariato, R., Preneel, B., & Joosen, W. (2011). A privacy threat analysis framework: supporting the elicitation and fulfillment of privacy requirements. Requirements Engineering, 16(1), 3-32.

## **Privacy by Design:** [^priDes] [^decChal] [^poltoPrac] [^desPrinciBig]

1. **Proactive not Reactive; Preventative not Remedial The Privacy by Design (PbD)**

We have adapted the design of our application based on anticipated challenges to privacy. For instance, we seek not to store the encryption key for the encrypted notes. This means that even if we are forced to access the notes for some reason in future without user’s authorization, it will simply not be possible to retrieve that information. Further, as we are using metamask for login authorization, we need not be aware of any identifiable information from the user to establish the authenticity for login. We use the public metamask key for digital signature verification so that we don't even have to bring the private metamask key in the scope of our app.

Proactively, we have provided the choice to user to keep their data on local storage or move it from server to the local storage at any point of time they choose to do so.

2. **Privacy as the Default Setting We can all be certain of one thing — the default rules!**

Our application incorporates this principle to a very high extent. By default, we do not ask the user to reveal any information other than what is absolutely necessary for the functioning of the app. Even that information is minimal and cannot be linked to the user. Our app does not establish any linkages between the user and their content. Firstly, because the app itself is not aware about the real life identity of the user. Secondly, by design itself, once the user saves the notes on their machine, the app can no longer decrypt those notes because the app does not store the private encryption key for those notes. And by default, we seek to retain the notes user created for a period of one year. This is the timeframe we determined to have the best balance between offering the best functioning to the user and the privacy concerns of having data retained for a long time.. 

3. **Privacy Embedded into Design Privacy by Design**

We designed the system from the ground up keeping the privacy concerns at the center of our design process. We targeted this app at the subset of users who want to create written notes without worrying about the tracking and profiling by the big tech. For such an identified user base, our decisions while designing this app were based on keeping things simple to understand for the user and being upfront about the features built to protect the access as well as keeping the data collection to a minimum. At no point during the usage of the app, the user will have to provide any other data about themselves apart from what they are adding in the notes which is not accessible to the backend servers of our app. The idea was to replicate the act of taking notes in a notebook. Our architecture makes sure that there is flexibility to move the notes from the servers to local storage and even if users continue to use the servers, there is no scope for decryption to retrieve the content in the backend without user permission.[^assurePrivacy]

4. **Full Functionality — Positive-Sum, not Zero-Sum**

Our app demonstrates that it is possible to have all three, namely: privacy, security and usability. Our design was made at the intersection of these three concepts. How?

**Privacy:** We do not establish any user profiling or collect data to identify users nor do we ask the users to provide the email or other PII to start using the app. We do not collect any tracking information about the user behavior or look through their notes for _“the so-called reason of enhancing their experience”. _ We offer the user the ability to privately create their notes in an already fully functioning enhanced self contained app.

**Security:** We adopt encryption as a two pronged approach-

1. As a way to protect user data against external data breaches.
2. As a way of architectural decision to protect the data against internal company actions. Since we are not aware of the content in the notes, it is highly unlikely that in future with an organizational change, a policy could be introduced to retrieve the contents for some nefarious purposes.

**Usability:** We offer a clean and simple interface without burdening users with additional features which can decrease the quality of overall user experience. 
Our goal was to ensure that mentally users should always feel _in control_:
- of the app 
- of the data they have entered in the app 
- of the ability to remove their data at any moment without additional complications. 

We wanted the app to be user friendly enough so that users are able to have the same understanding of the app as anyone in the engineering department without going into the specifics.

5. **End-to-End Security — Full Lifecycle Protection**

Our app implements the protection of data from start to finish. Before even the collection of data, we make sure that we do not relate the identity of the user with the data being created. Then when the user saves the notes, we make sure to encrypt it so that it is protected at all places in its life cycle in the system. Lastly, we have a clear data deletion policy where we retain notes only for 12 months from the date of creation/ modification time.

6. **Visibility and Transparency — Keep it Open**

We intend to make our app open source after the successful completion of the course (with permission of course!). We have been upfront about the data collection and usage practices of the app. At no place in the life cycle of the app will the user have to provide any data about which they are unaware. Lastly, we have adopted a simplistic design approach so that all the functionalities are clear to the user without introducing any unneeded complexity by overburdening the user with features.

7. **Respect for User Privacy — Keep it User-Centric**

Our goal behind the design of the app was to provide the user with a better alternative to create text notes without being tracked by the big tech. From group up, the app was made with user concerns at forefront. We adapted our design to suit the needs we expected the users to have. For instance, we shall not collect user PII for logging in, all notes will be encrypted once they leave the user's machine, we will not store encryption keys in our servers and users have the option to use the app in local fashion removing all their content from the servers.

[^priDes]: Cavoukian, A. (2009). Privacy by design: The 7 foundational principles. Information and privacy commissioner of Ontario, Canada, 5, 12.

[^decChal]: Cavoukian, A., & Information and Privacy Commissioner/Ontario. (2009). Privacy by design, take the challenge. Information and Privacy Commissioner of Ontario.

[^poltoPrac]: IBM Canada, & Information and Privacy Commissioner/Ontario. (2011). Privacy by design : from policy to practice. Information and Privacy Commissioner of Ontario, Canada.

[^desPrinciBig]: Cavoukian, A., Jonas, J., & Office of the Information and Privacy Commissioner/Ontario. (2012). Privacy by design in the age of big data. Information and Privacy Commissioner of Ontario, Canada.

[^assurePrivacy]: Cavoukian, A. (2012). Privacy by design: origins, meaning, and prospects for assuring privacy and trust in the information era. In Privacy protection measures and technologies in business organizations: aspects and standards (pp. 170-208). IGI Global.

## References:

