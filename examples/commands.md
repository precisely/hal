# Text command
Shows text
```yaml
# canonical form
- type: "text"
  text: A string
  typing: true | false # default = true
  typingSpeed: 40 # 40 words/min - how long ellipsis animation is shown

# short forms:
- A string
```

# Reply command
Shows clickable text bubble reply buttons
```yaml
# canonical form
- type: reply
  key: havingFunYet
  choices:
    - text: Yep!
      value: yes
      do: Glad to hear that!
    - text: Nope!
      value: no

# short forms:
- key: havingFunYet
  choices:
    - "yes"
    - "no"

- key: havingFunYet
  choices:
    yes: Glad to hear that! # send this message
    no: # do nothing
```