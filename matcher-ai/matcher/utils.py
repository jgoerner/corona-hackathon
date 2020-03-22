import pgeocode
import pandas as pd
import random

random.seed = 1


def filter_and_score_jobs(employee_id):
    """
    Function that filters possible jobs for one employee by hard criteria (student, german speaking, drivers-license,
    working hours), scores jobs by soft-criteria (start date, distance)
    returns a df with all possible jobs for this employee and the respective scores
    """
    # connections string
    con = "postgres://fhxagpklsgbryv:24e07502a507c1d486bc46b3eceb0bec570b2810ac15efe2f3d1e0fdffedd750@ec2-54-217-" \
          "204-34.eu-west-1.compute.amazonaws.com:5432/d6n76bgdm2kuf3"
    zip_code_list = [80796, 80798, 80333, 80538, 80939, 80331, 81245, 80803, 80809, 80999]

    # get metadata for employee
    df_employee = pd.read_sql("SELECT * FROM employee WHERE id = '{}'".format(employee_id), con=con)
    # mock employee zip code
    df_employee['zip_code'] = str(random.choice(zip_code_list))
    # mock english speaking
    df_employee['english_speaking'] = random.choice([True, False])

    # load metadata for jobs that still have demand
    # df_jobs = pd.read_sql_table("job", con=con)
    df_jobs = pd.read_sql("SELECT * FROM job WHERE current_demand_qty > 0", con=con)
    df_jobs = df_jobs[df_jobs['current_demand_qty']>0]
    # mock job zip code
    df_jobs['zip_code'] = df_jobs.apply(lambda x: str(random.choice(zip_code_list)), axis=1)
    df_jobs['student_job'] = df_jobs.apply(lambda x: random.choice([True, False]), axis=1)
    # mock english requirement
    df_jobs['english_required'] = df_jobs.apply(lambda x: random.choice([True, False]), axis=1)

    hard_skills_col_dict = {'german_speaking': 'german_required', 'english_speaking': 'english_required',
                            'drivers_license': 'drivers_license_required', 'student': 'student_job'}
    for skill, requirement in hard_skills_col_dict.items():
            if not df_employee[skill].iloc[0]:
                df_jobs = df_jobs.loc[~(df_jobs[requirement]==True)]
    # filter if working hours > max working hours of employee
    df_jobs = df_jobs.loc[df_jobs['hours_per_week'] <= df_employee['max_h_per_week'].iloc[0]]

    # TODO filter jobs that start too late
    # calculate distance between zip codes
    dist = pgeocode.GeoDistance('DE')
    df_jobs['distance'] = df_jobs.apply(
        lambda x: dist.query_postal_code(df_employee['zip_code'].iloc[0], x['zip_code']), axis=1)
    if df_jobs['distance'].max() != df_jobs['distance'].min():
        df_jobs['distance_score'] = (df_jobs['distance'].max() - df_jobs['distance']) / \
                                                     (df_jobs['distance'].max() - df_jobs['distance'].min())
    else:
        df_jobs['distance_score'] = 1

    # score for salary (max salary =1, min salary = 0)
    if df_jobs['salary_per_h'].max() != df_jobs['salary_per_h'].min():
        df_jobs['salary_score'] = (df_jobs['salary_per_h'].max() - df_jobs['salary_per_h']) / \
                                                     (df_jobs['salary_per_h'].max() - df_jobs['salary_per_h'].min())
    else:
        df_jobs['salary_score'] = 1

    # average of scores
    df_jobs['score'] = df_jobs[['distance_score', 'salary_score']].mean(axis=1).round(2)

    # TODO: add explanation
    df_jobs['explanation'] = 'Beste Leben'
    df_jobs['jobId'] = df_jobs['id']

    return df_jobs.sort_values('score', ascending=False)[['explanation', 'score', 'jobId']].head(3).to_dict('records')
