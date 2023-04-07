import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PrivacyPolicyImage from "../../assets/images/privacy_policy.svg"

/**
 * Component that displays the privacy policy of our application
 * @returns 
 */
const PrivacyPolicy = () => {
    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h3" color="primary.main" fontWeight="bold" textAlign="center"><img src={PrivacyPolicyImage} height="250" alt="Privacy Policy" /> <br />Privacy Policy</Typography>
            <Typography variant="h6">Thank you for using our private note-taking app. This privacy policy outlines how we collect, use, and protect your data.
            </Typography>
            <br />
            <Typography variant="h5" color="primary.dark" fontWeight="bold">Data Collection</Typography>
            <Typography>Our app does not collect any personally identifiable information from you. We do not require you to create an account, provide any personal details, or collect any information about your device or location. We do not use cookies or other tracking technologies.
            </Typography>
            <br />
            <Typography variant="h5" color="primary.dark" fontWeight="bold">Note Content</Typography>
            <Typography>We use end-to-end encryption to secure your notes. This means that your notes are encrypted on your device using strong encryption algorithms such as AES-256 and are only decrypted locally when you enter your password or biometric credentials. We do not store or transmit your notes to any external servers or databases, and we do not have access to the contents of your notes.
            </Typography>
            <br />
            <Typography variant="h5" color="primary.dark" fontWeight="bold">Sharing of Information</Typography>
            <Typography>We do not share your data with third parties for any purpose, including marketing, advertising, or analytics. However, in rare cases where required by law, we may be compelled to disclose your data to authorities or law enforcement agencies.
            </Typography>
            <br />
            <Typography variant="h5" color="primary.dark" fontWeight="bold">Security</Typography>
            <Typography>We take the security of your data seriously and follow industry best practices to protect it. Our app uses secure communication protocols such as HTTPS to encrypt all data transmissions between the app and our servers. We regularly update our app to fix any known vulnerabilities or security issues and perform regular security audits and penetration testing.
            </Typography>
            <br />
            <Typography variant="h5" color="primary.dark" fontWeight="bold">Third-Party Services</Typography>
            <Typography>Our app does not use any third-party services or libraries that may collect your data. We do not use analytics or tracking tools, and we do not incorporate any social media or advertising plugins that may compromise your privacy.
            </Typography>
            <br />
            <Typography variant="h5" color="primary.dark" fontWeight="bold">Changes to Privacy Policy</Typography>
            <Typography>We may update this privacy policy from time to time, and we will notify you of any changes through the app or by email. We encourage you to review this policy periodically.
            </Typography>
            <br />
            <Typography variant="h5" color="primary.dark" fontWeight="bold">Contact Us</Typography>
            <Typography>If you have any questions or concerns about this privacy policy or our app's privacy practices, please contact us at support@notevault.com
            </Typography>
            <br />
            <Typography variant="h5" color="primary.dark" fontWeight="bold">Effective Date</Typography>
            <Typography>
                This privacy policy is effective as of 3 April, 2023
            </Typography>
        </Container>
    )
}

export default PrivacyPolicy;