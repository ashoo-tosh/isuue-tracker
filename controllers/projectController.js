const Project = require('../models/project');
const Issue = require('../models/issues');

// for creating project 
module.exports.create = async (req, res) => {
    try {
        let project = await Project.create({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author
        });
        return res.redirect('/');
    } catch (error) {
        return res.redirect('back');
    }
}

// for create issue
module.exports.createIssue = async function (req, res){
    try {
//         first ensure that project is persent 
              let project = await Project.findById(req.params.id);
              if (project) {
                let issue = await Issue.create({
                  title: req.body.title,
                  description: req.body.description,
                  labels: req.body.labels,
                  author: req.body.author,
                });
//           pushing created issue id into project's issues array
                project.issues.push(issue);
          
//           accessing labels with some condition
                if (!(typeof req.body.labels === 'string')) {
                  for (let label of req.body.labels) {
                    let isPresent = project.labels.find((obj) => obj == label);
                    if (!isPresent) {
 //                 if not ispresent then push labels= into labels
                      project.labels.push(label);
                    }
                  }
                } else {
                  let isPresent = project.labels.find((obj) => obj == req.body.labels);
                  if (!isPresent) {
                    project.labels.push(req.body.labels);
                  }
                }
                await project.save();
                return res.redirect(`back`);
              } else {
                return res.redirect('back');
              }
            } catch (error) {
                return res.redirect('back');
    }
}

// for rendering project form page
module.exports.createProject = (req, res) => {
    return res.render('project_form', {
        title: 'Create | Project-Form'
    });
}

//for rendering project page
module.exports.project = async(req, res) => {
    try {
        let project = await Project.findById(req.params.id)
        .populate({
          path: 'issues',
        }).exec();
  
        if(project) {
          return res.render('project_page', {
            title: 'project | page',
            project : project
          })
        }
  
        return res.redirect('back');
    } catch (error) {
        console.log('error in rendering project page', error);
        return;
    }
}

// for rendering issue for page
module.exports.issueForm = async (req, res) => {

    try{ 
      let project = await Project.findById(req.params.id);
   if(project) {
    return res.render('issue_form', {
      title: 'Issue | Form',
      project,
    })
   }    

   return res.redirect('/');

    } catch (error) {

      console.log('Error', error);

    }
}



// for rendering project issues
module.exports.showProjectIssues = async (req, res) => {
    try {
      let project =await Project.findById(req.params.id)
      .populate({
        path: 'issues',
      }).exec();

      return res.render('project_issues',{
        title: 'Project | Issues',
        project
      })
    } catch (error) {
      console.log('Error', error);
    }
  }
