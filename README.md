# Welcome to Kinder!

We are glad that you consider our social enterprise as your future workplace. This project is a simple example of our approach on design and frontend implementation. We invite you to create this one pager to show off your skills, and then to a discussion about the choices you made in your solution.
# Before you start
## Working environment

Your solutions should be in a private repo. Since this repo is public, you can not fork it and then make it private. You can, however, create a private one for yourself:
### 1. Create a new private repo on GitHub
[Follow the instructions here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-new-repository).

### 2. Name your repo to `kinder-frontend-assignment`
### 3. Add reviewers as collaborators
In your private repo settings, add the following GitHub users as collaborators, so that they can review your code:

- [Bram Pelgrom](https://github.com/mobypicture)
- [Szabolcs Farkas](https://github.com/S4n3L)

### 4. Development

We work in React and typescript so we would like to see your solution in this environment. If you don't have React experience we also can accept your solution in Vue + Typescript. As for React, we use only functional components in our donation platform, so using hooks in your solution is also preferable.

Make sure you've blocked a couple of hours. Once you're ready for it, let's go:

- create yours first commit to initialize your repo. We will use commit timestamps to see which part of the assignment went smooth and which took longer. No worries; some are expected to take quite a bit!
- please make a commit / push after every significant change on your code as if you were working in a team (including the commit message).
- build the architecture as you like - feel free to create components, pages as many as you need. We will discuss your decisions about the architecture later
- don't forget to include at few test to your code (unit / integration). We use [jest](https://jestjs.io/) with [react testing library](https://testing-library.com/docs/react-testing-library/intro/) and happy to see your solution in based on these, but feel free to use other libraries you are comfortable with (Cypress, Enzyme, etc)
- we are heavy `redux` users, so you also can include some reducer logic in your code if you have time for that, but this is optional.
- the main resolution type is 1366x768 for desktop and 360px wide for mobile. Your solution should be responsive, but we don't focus on the in-between resolution types (ex.: tablets)
- your code should be production ready as much as possible. Please include a readme file to give a description what platform you chosed for your solution, what architectural decisions you made, and why. Please also include instructions how we should build and run your project. We don't expect you to write a whole documentation: a few sentences is enough as a basis of our conversation for your 2nd interview.

# Assignment

In this assignment we ask you to build a search page for our donation platform, based on the given design.

![screenshot](/assignment_design.png)

## API
### Request

Our public API is accessible on the following url: https://staging-api.kinder.world
To create a search request you need to make a `POST` call to the `/search/public` route. We use Laravel on the backend, so you have to specify some includes to get the proper results: `include=cause.categories,cause.hasPassedPreliminary,appeal.organisations.cause`

Your final request call would be the following: https://staging-api.kinder.world/search/public?include=cause.categories,cause.hasPassedPreliminary,appeal.organisations.cause

You can specify the request in a `JSON` body as you see it in this example:
```
{
	"query":"health",
	"entities":[
        { "entity": "causes", "perPage": 6, "currentPage": 1 }
    ]
}
```

This call gives you all organisations that has some connections with health, starting with the first page and the maximum of six organisations per page. You probably guesssed already, but to get the second page just specify the `currentPage` key to `2`.
### Result

The response you get will be in the following structure:

```
export interface SearchResponseType {
  causes?: {
    meta: SearchResponseMetaType
    data: CauseDataType[]
  }
}
```

For the detailed sub-types please check the [types](/types.ts) file in this repository. Feel free to copy / include this file to your project.

## User stories

Please implement the following user stories. We specified the acceptance criterias for each story, so please consider these when you finish one. There are some bonus stories at the end of this list that you can implement if you have enough time. We suggest to estimate all the stories before you start working, because some of the sories might have an impact on your app architecture.
### Must have stories

#### 1. As a user who arrived to the page first time I would like to see an input field with a label and an empty white result container.

AC:

- should have the label text according to the design
- should have a border according to the design
- should have an X icon, a vertical divider and a magnifier icon
- should clear the input when I press the X icon
- should start a search when I click on the magnifier icon
- should start a search when I hit enter

#### 2. As a user, I would like to see a spinner (any kind) while the data is loading

AC:

- should appear in the result section when I start seacrhing and dissapear when we got back the results
- when we fetched the first batch of organisations (six according to the request example) and I click on the load more button the spinner should appear under the first batch and dissapear when we got back the results

#### 3. As a user I would like to see the organisations in a card format according to the design.

AC:

- Should show the header image of the organisation (`images.data[0].files.data[0].url` in the result object)
- Should show the logo of the organisation (`logo.data.files.data[0].url` in the result object)
- Should show the category names (`Human rights, Health, Education, etc`)
- Should show the tagline under the org. name as it is presented in the design

#### 4. As a user I would like the pink line at the bottom of the card to be presented differently based on the status of the organisation

AC:

- Please note the design is not accurate, so we describe here what we want to see
- Organisations can be in three different stages based on the following equations in the result object:
  stage 1: `basicPassed === false`
  stage 2: `basicPassed === true` and `publishedAt === false`
  stage 3: `basicPassed === true` and `publishedAt === not null`
- the line represents a progress according to their stage
- for stage 1 organisations the length of the pink line should be 1/3 of the card width
- for stage 2 organisations the length of the pink line should be 2/3 of the card width
- for stage 3 organisations the length of the pink line should be the same as the card width
- the remaining space (for stage 1 and 2) should be gray

#### 5. As a user I would like to see a different representation of the card based on the organisation' stage

AC:

- Should show two card versions only (in the design you see three): if the organisation is at stage 3 we should show the version with the header image + logo.
- If the org. at stage 1 or stage 2 we should show a grey box with a text:
```
Membership pending
This organisation has no published profile
```
- You can use any icon here
#### 6. I want to be redirected to the organisation page when I click on the organisation image

AC:

- should open in a new tab

#### 7. As a Galaxy 5s mobile user I would like to see the basic resposive version of the page

- the organisation cards should be in one column and aligned with the input field
### Nice to have

#### 8. As a user I would like to see a load more button when the first result of organisations appear.

AC:

- the button caption should refer to the result: if we specify 6 organisations to get in one batch and we have a total of 138 organisation we should see "Load 6 more of 138"
- when I click to the button the next batch of the organisation should be loaded and appear on the screen
- I should be able to click on load more as long as we have data that we can fetch
#### 9. As a user I would like to get a singe link that points to the result page directly

- It should be something like this: https://yourdomain.com/search?query=health&perpage=6&currentpage=2
- This should take to me to the search page where I see the results for the search term `health`
- I should see only 6 organisation cards
- I should see the second page of the results
