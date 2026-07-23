---
title: "Le bug caché de Meta : quand le nouveau plan de numérotation du Bénin fait planter l'API WhatsApp"
date: "2026-07-23"
tags: ["Debugging", "WhatsApp Business API", "Bénin", "Reverse Engineering"]
image_cover: "/images/blog/kwiko-meta-bug/kwiko-meta-bug-cover.png"
resume: "En configurant WhatsApp Cloud API pour Kwiko, un bug silencieux de Meta empêchait toute vérification d'un numéro béninois. Récit d'une enquête réseau qui a fini en ligne de commande."
temps_lecture: 7
---

## fr

### Le contexte

En construisant [Kwiko](/projets/kwiko), un assistant WhatsApp intelligent pour PME, la dernière étape avant de pouvoir tester le produit de bout en bout semblait la plus simple : ajouter mon propre numéro comme destinataire de test dans le tableau de bord Meta for Developers. Une formalité de trente secondes, en théorie.

Meta a refusé mon numéro. Systématiquement. Avec un message d'erreur qui n'avait aucun sens :

> *"Le numéro de téléphone n'est pas associé à un compte WhatsApp Business."*

Mon numéro était pourtant un numéro WhatsApp parfaitement actif, que j'utilise tous les jours. Ce n'était pas une erreur de saisie. C'était un vrai bug — et il a fallu sortir les outils réseau du navigateur pour le comprendre.

### Le premier indice

Le Bénin a changé son plan de numérotation téléphonique fin 2024, en ajoutant un préfixe `01` devant tous les numéros existants. Ce qui rend ce changement inhabituel, c'est qu'à la différence de la plupart des pays où un `0` initial est un simple préfixe national qu'on retire pour l'international, **le `0` du nouveau préfixe béninois `01` doit être conservé même en format international** : `+229 01 XX XX XX XX`, dix chiffres après l'indicatif.

En tapant mon numéro dans le champ de saisie de Meta, j'ai remarqué que l'interface le réaffichait systématiquement sans ce `0` — `+229 1 XX XX XX XX` au lieu de `+229 01 XX XX XX XX`. Meta traitait visiblement ce chiffre comme un trunk prefix classique à supprimer, une règle qui ne s'applique pas au nouveau plan béninois.

![Message d'erreur affiché par Meta lors de la vérification du numéro](/images/blog/kwiko-meta-bug/erreur_meta_whatsapp_business.png)

### Où ça se complique

Premier réflexe : contourner le bug d'affichage en tapant le numéro autrement — collage plutôt que saisie, double zéro en préfixe, changement de navigateur. Rien n'y a fait. Le champ affichait toujours le numéro sans le `0`, quelle que soit la méthode de saisie.

Ça voulait dire une chose : le problème n'était pas dans l'affichage du champ, mais dans **ce qui était réellement envoyé au serveur**. Pour en avoir le cœur net, direction les outils de développement du navigateur, onglet Réseau.

### L'inspection

En filtrant les requêtes par `graphql`, la mutation responsable de l'envoi du code de vérification est apparue clairement : `useSendCodeToWhatsAppBusinessPublicTestPhoneNumberRecipientMutation`. Et dans son payload :

```
"recipient_number":"229145111786"
```

Confirmation : le `0` était bel et bien supprimé **avant l'envoi réseau**, pas juste à l'affichage. Le numéro correct aurait dû être `2290145111786`. Le bug se situait dans la logique JavaScript de Meta elle-même, en amont de la requête — pas quelque chose qu'une astuce de saisie pouvait contourner côté client.

### La correction

Puisque le bug était côté client (dans la construction du payload) et non côté serveur (dans sa validation), la solution devenait évidente : reconstruire la requête à la main, avec la bonne valeur, et l'envoyer directement.

1. Clic droit sur la requête GraphQL capturée → *Copier comme cURL*
2. Remplacement de `"recipient_number":"229145111786"` par `"recipient_number":"2290145111786"`
3. Exécution de la commande corrigée dans un terminal

```bash
curl 'https://developers.facebook.com/api/graphql/' \
  -X POST \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'X-FB-Friendly-Name: useSendCodeToWhatsAppBusinessPublicTestPhoneNumberRecipientMutation' \
  -H 'Cookie: [cookies de session du compte]' \
  --data-raw 'fb_dtsg=...&variables=%7B%22input%22%3A%7B...%22recipient_number%22%3A%222290145111786%22%7D%7D&doc_id=...'
```

Réponse du serveur :
```json
{"data":{"xfb_add_whatsapp_business_public_test_phone_number_recipient_code_send":true}}
```

Le code de vérification est arrivé sur WhatsApp quelques secondes plus tard. Même correction appliquée à la mutation de vérification du code (`useVerifyCodeForWhatsAppBusinessPublicTestPhoneNumberRecipientMutation`), et le numéro a été validé.

### Un point de vigilance

Cette méthode consiste à rejouer une requête de son propre compte, capturée via les outils standards du navigateur — une pratique de debugging tout à fait légitime, sans rien contourner côté authentification ou autorisation. Un vrai point de vigilance existe cependant : le cURL généré par le navigateur inclut automatiquement les cookies de session actifs. Ces valeurs sont aussi sensibles qu'un mot de passe et ne doivent jamais être partagées, collées dans un outil tiers, ou laissées dans un historique de terminal accessible — au moindre doute d'exposition, mieux vaut invalider ses sessions actives et changer son mot de passe par précaution.

### Ce qu'il faut en retenir

Ce genre de bug rappelle une réalité simple : les grandes plateformes ne sont pas pensées en priorité pour les particularités locales. Un changement de plan de numérotation, aussi documenté soit-il dans son pays d'origine, peut rester invisible pendant des mois dans les systèmes de validation d'une entreprise internationale — jusqu'à ce que quelqu'un tombe dessus et prenne le temps de creuser au lieu de simplement contourner avec un numéro d'un autre pays.

Face à un mur qui n'a aucun sens, l'onglet Réseau des outils de développement reste souvent le moyen le plus rapide de comprendre ce qui se passe *réellement*, au-delà de ce que l'interface montre.

---

## en

### The context

While building [Kwiko](/projets/kwiko), a WhatsApp AI assistant for small businesses, the last step before running a real end-to-end test seemed like the easiest one: add my own number as a test recipient in the Meta for Developers dashboard. A thirty-second formality, in theory.

Meta rejected my number. Every time. With an error message that made no sense at all:

> *"This phone number is not associated with a WhatsApp Business account."*

My number was a perfectly active WhatsApp number I use every day. This wasn't a typo. It was a genuine bug — and it took opening the browser's network tools to actually understand it.

### The first clue

Benin changed its phone numbering plan in late 2024, adding a `01` prefix to all existing numbers. What makes this change unusual is that, unlike most countries where a leading `0` is a simple national trunk prefix dropped for international dialing, **the `0` in Benin's new `01` prefix must be kept even in international format**: `+229 01 XX XX XX XX`, ten digits after the country code.

While typing my number into Meta's input field, I noticed the interface consistently redisplayed it without that `0` — `+229 1 XX XX XX XX` instead of `+229 01 XX XX XX XX`. Meta was clearly treating this digit as a classic trunk prefix to be stripped, a rule that doesn't apply to Benin's new plan.

![Error message shown by Meta during phone number verification](/images/blog/kwiko-meta-bug/erreur_meta_whatsapp_business.png)

### Where it got complicated

First instinct: work around the display bug by entering the number differently — pasting instead of typing, a double leading zero, switching browsers. None of it worked. The field kept showing the number without the `0`, regardless of the input method.

That meant one thing: the problem wasn't in how the field displayed the number, but in **what was actually being sent to the server**. To find out for sure, it was time to open the browser's developer tools, Network tab.

### The investigation

Filtering requests by `graphql`, the mutation responsible for sending the verification code appeared clearly: `useSendCodeToWhatsAppBusinessPublicTestPhoneNumberRecipientMutation`. And in its payload:

```
"recipient_number":"229145111786"
```

Confirmed: the `0` was indeed being dropped **before the network request was even sent**, not just in the display. The correct number should have been `2290145111786`. The bug lived in Meta's own JavaScript logic, upstream of the request — not something a clever input trick could work around client-side.

### The fix

Since the bug was on the client side (building the payload) rather than the server side (validating it), the fix became obvious: rebuild the request by hand, with the correct value, and send it directly.

1. Right-click the captured GraphQL request → *Copy as cURL*
2. Replace `"recipient_number":"229145111786"` with `"recipient_number":"2290145111786"`
3. Run the corrected command in a terminal

```bash
curl 'https://developers.facebook.com/api/graphql/' \
  -X POST \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'X-FB-Friendly-Name: useSendCodeToWhatsAppBusinessPublicTestPhoneNumberRecipientMutation' \
  -H 'Cookie: [account session cookies]' \
  --data-raw 'fb_dtsg=...&variables=%7B%22input%22%3A%7B...%22recipient_number%22%3A%222290145111786%22%7D%7D&doc_id=...'
```

Server response:
```json
{"data":{"xfb_add_whatsapp_business_public_test_phone_number_recipient_code_send":true}}
```

The verification code arrived on WhatsApp a few seconds later. The same fix applied to the code-verification mutation (`useVerifyCodeForWhatsAppBusinessPublicTestPhoneNumberRecipientMutation`), and the number was successfully validated.

### A word of caution

This technique replays a request from one's own account, captured through standard browser tools — a perfectly legitimate debugging practice that bypasses nothing on the authentication or authorization side. One real caveat does apply, though: the cURL command generated by the browser automatically includes active session cookies. These values are as sensitive as a password and should never be shared, pasted into a third-party tool, or left in an accessible terminal history — at the slightest doubt of exposure, invalidating active sessions and changing the password is the safer move.

### The takeaway

Bugs like this are a good reminder: large platforms aren't primarily designed around local particularities. A numbering plan change, however well documented in its home country, can stay invisible for months in a global company's validation systems — until someone runs into it and takes the time to dig in instead of simply working around it with a number from another country.

When facing a wall that makes no sense, the Network tab in the browser's developer tools is often the fastest way to understand what's *actually* happening, beyond what the interface shows.
