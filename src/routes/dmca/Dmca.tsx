import React from 'react';
import { useLocation } from "react-router-dom";
import TextPage from "../../features/page/TextPage";

const PrivacyPolicy = () => {const location = useLocation();
   return (
        <TextPage>
            <h1>DMCA</h1>
            <h1>DMCA Notice & Takedown Procedure</h1>
            <p>This website abides by the federal&nbsp;<a
                href="https://web.archive.org/web/20160612072436/http://www.copyright.gov/legislation/dmca.pdf" target="_blank">Digital
                Millennium Copyright Act (DMCA)</a>&nbsp;by responding to notices of alleged infringement that comply
                with the DMCA and other applicable laws. As part of our response, we may remove or disable access to
                material residing on this website that is claimed to be infringing, in which case we will make a
                good-faith attempt to contact the person who submitted the affected material so that they may make a
                counter notification, also in accordance with the DMCA.</p><p>Before serving either a Notice of
                Infringing Material or Counter-Notification, you may wish to contact a lawyer to better understand your
                rights and obligations under the DMCA and other applicable laws. The following notice requirements are
                intended to comply with Creative Commons’ rights and obligations under the DMCA and, in particular,
                section 512(c), and do not constitute legal advice.</p><p><strong>Notice of Infringing Material</strong>
            </p><p>To file a notice of infringing material on TriviaNerds.com, please provide a notification containing
                the following details:</p>
                <ol>
                    <li>Reasonably sufficient details to enable us to identify the work claimed to be infringed or, if
                        multiple works are claimed to be infringed, a representative list of such works (for example:
                        title, author, any registration or tracking number, URL);
                    </li>
                    <li>Reasonably sufficient detail to enable us to identify and locate the material that is claimed to
                        be infringing (for example a link to the page that contains the material);
                    </li>
                    <li>Your contact information so that we can contact you (for example, your address, telephone
                        number, email address);
                    </li>
                    <li>A statement that you have a good faith belief that the use of the material identified in (2) is
                        not authorized by the copyright owner, its agent, or the law;
                    </li>
                    <li>A statement, under penalty of perjury, that the information in the notification is accurate and
                        that you are authorized to act on behalf of the owner of the exclusive right that is alleged to
                        be infringed.
                    </li>
                    <li>Your physical or electronic signature.</li>
                </ol>
                <p>Then send this notice to the information provided in the Contact section of this website.</p>
                <h2>Counter-Notification</h2><p>If material that you have posted to a site controlled or operated by
                    this website has been taken down, you may file a counter-notification that contains the following
                    details:</p>
                <ol>
                    <li>Identification of the material that has been removed or to which access has been disabled and
                        the location at which the material appeared before it was removed or disabled;
                    </li>
                    <li>A statement, under penalty of perjury, that you have a good faith belief that the material was
                        removed or disabled as a result of mistake or misidentification of the material in question;
                    </li>
                    <li>Your name, address and telephone number;</li>
                    <li>A statement that you consent to the jurisdiction of the Federal District Court for judicial
                        district in which your address is located or, if your address is outside of the USA, for any
                        judicial district in which Creative Commons may be found and that you will accept service of
                        process from the person who submitted a notice in compliance with the section (c)(1)(C) of the
                        DMCA, as generally described above;
                    </li>
                    <li>Your physical or electronic signature.</li>
                </ol>
                <p>Then send this notice to the information provided in the Contact Us section of this website.</p>
                <p>You may be able to find examples of counter-notifications at&nbsp;<a
                    href="https://web.archive.org/web/20160612072436/http://www.chillingeffects.org/dmca/counter512.pdf" target="_blank">www.chillingeffects.org/dmca/counter512.pdf</a>.
                    Please note, however, that this is no substitute for legal advice and you should obtain legal advice
                    to better understand your rights and obligations under the DMCA and applicable laws.</p>
        </TextPage>
    );
};

export default PrivacyPolicy;
