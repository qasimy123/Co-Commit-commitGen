![alt text](commitgen/co-commit App.png)

## Inspiration

The idea for Co-Commit came from our team's frustration with trying to come up with meaningful and descriptive commit messages on tight deadlines. We wanted to find a way to streamline the commit process, so we could focus on writing code and not worry about crafting the perfect commit message.

## What it does

Co-Commit is a Visual Studio Code extension that helps developers create clear and concise commit messages at the click of a button. 

## How we built it
We extended existing LLM models on our own datasets. We scraped high visibility popular open-source GitHub repositories such as Angular, BitCoin, Axios, etc. We parsed git diffs and other code context features and input them into our model. To facilitate the model, we built a proxy server for relaying the requests securely, and we built it into a VSCode extension for ease of use. 

## Challenges we ran into
It was difficult to find clean data, and we wanted to find established repos with high-quality code-commit examples. This proved to be difficult as even high-quality open-source repos can have bad commits as well.
## Accomplishments that we're proud of
We built a working prototype!

## What we learned
We had great hands-on experience developing an NLP model, it also gave us a better understanding of existing LLM models as we found their deficiencies in some areas.

## What's next for Co-Commit
For larger commits spanning more than two files, our model does not respond. These large commits do not follow typical code conventions as they should be made smaller. However, to solve this, we can create a list of commit messages for each git diff in each individual file. Another improvement is to expand the NLP pipeline by adding an additional classifier that determines the appropriate type of git commit specified by Conventional Commit Standards. This would feed into our original model, and would also help the generation of commit messages.
